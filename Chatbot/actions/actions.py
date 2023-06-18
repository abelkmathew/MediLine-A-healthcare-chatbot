# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

from typing import Any, Text, Dict, List
from rasa_sdk.events import SlotSet, AllSlotsReset
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction
from rasa_sdk.types import DomainDict

#Importing Library for ML
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import csv
import pandas as pd
import re

#Importing Library for Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import date
from twilio.rest import Client

# Use a service account
cred = credentials.Certificate('<YOUR_CREDENTIALS_HERE>')
firebase_admin.initialize_app(cred)
db = firestore.client()


training = pd.read_csv('/app/actions/training.csv')
sym_count=0
symptoms_exp=[] 
symptoms_given=[]
disease_input="cold"
sym=0
n=''
temp=0

#Checking given expression to the list of symptoms in Dataset
def check_pattern(dis_list,inp):
    inp=inp.lower()
    pred_list=[]
    ptr=0
    patt = "^" + inp + "$"
    regexp = re.compile(inp)
    for item in dis_list:
        if regexp.search(item):
            pred_list.append(item)
    if(len(pred_list)>0):
        return 1,pred_list
    else:
        return ptr,item

def sec_predict(symptoms_exp):
    df = pd.read_csv('/app/actions/training.csv')
    X = df.iloc[:, :-1]
    y = df['prognosis']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=20)
    rf_clf=RandomForestClassifier()
    rf_clf.fit(X_train.values, y_train)
    symptoms_dict = {}
    for index, symptom in enumerate(X):
        symptoms_dict[symptom] = index
    input_vector = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input_vector[[symptoms_dict[item]]] = 1
    return rf_clf.predict([input_vector])

class ActionResetEverything(Action):

    def name(self) -> Text:
        return "action_reset_everything"


    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            global sym_count,symptoms_exp,symptoms_given,disease_input,sym,n
            sym_count=0
            symptoms_exp=[] 
            symptoms_given=[]
            disease_input="cold"
            sym=0
            n=''
            return [AllSlotsReset()]
            
class ActionChangeDoctorName(Action):

    def name(self) -> Text:
        return "action_change_doctor_name"


    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            global n
            g=tracker.get_slot('doctor')
            if (n==''):
            	n=g
            	return [SlotSet("name",g),SlotSet("doctor",None)]
            else:
            	g=n+' '+g
            	return [SlotSet("name",g),SlotSet("doctor",None)]

class ActionPrimaryPrediction(Action):

    def name(self) -> Text:
        return "action_primary_prediction"


    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        disease_input = tracker.get_slot('primary_symptom')
        # dispatcher.utter_message(disease_input)
        list1=training.columns.tolist()
        conf,cnf_dis=check_pattern(list1,disease_input)
        
        if conf==1:
            button_list =[]
            for d in cnf_dis:
                fill_slot = '{"related_symptom" : "' + d + '"}'
                button_list.append({"title": d, "payload": f"/disease_main_symptom{fill_slot}"})
            dispatcher.utter_message(text="Please select the one you meant:", buttons=button_list)

        return []

class ActionSecondaryPrediction(Action):

    def name(self) -> Text:
        return "action_secondary_prediction"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:


        global disease_input
        global sym_count   
        global symptoms_given
        global sym
        
        disease_input = tracker.get_slot('related_symptom')
        # dispatcher.utter_message(disease_input)
        symptoms_first=[]
        symptoms_first.append(disease_input)
        first=sec_predict(symptoms_first)

        reduced_data = training.groupby(training['prognosis']).max()
        red_cols = reduced_data.columns
        symptoms_given = red_cols[reduced_data.loc[first].values[0].nonzero()]
        symptoms_given=symptoms_given.tolist()
        if disease_input in symptoms_given:
            symptoms_given.remove(disease_input)
        sym_count=len(symptoms_given)
 
        if sym<sym_count:
            msg=symptoms_given[sym]
            # dispatcher.utter_message(msg)
            return[SlotSet("symptom",msg)]

        else:
            # dispatcher.utter_message(text="Getting out")
            return [SlotSet("temp",True)]



class ActionSymptomChecker(Action):

    def name(self) -> Text:
        return "action_symptom_checker"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        global disease_input
        global sym_count   
        global symptoms_given
        global sym
        checker=tracker.get_slot('sym_check')
      
        if checker=="sym-yes":
            j= symptoms_given[sym]
            symptoms_exp.append(j)
            
        sym=sym+1    
        if sym<sym_count:
            msg=symptoms_given[sym]
            # dispatcher.utter_message(msg)
            return[SlotSet("symptom",msg)]
        else :
            dispatcher.utter_message(text="Prediting your disease...")          
            return [SlotSet("temp",True)]
        

        return []
            



class ActionPredictClassify(Action):

    def name(self) -> Text:
        return "action_predict_classify"
       

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        global symptoms_given
        global sym
        global symptoms_exp
        global disease_input
        global deptno
        global pred_disease
        symptoms_exp.append(disease_input)
        second_prediction=sec_predict(symptoms_exp)
        pred_disease=second_prediction[0]
        dispatcher.utter_message(second_prediction[0])

        with open('/app/actions/DisDeptClassification.csv',newline='') as csvfile:
            data=csv.DictReader(csvfile)
            for row in data:
                if (row['Disease']==second_prediction[0]):
                    dept=row['Department']
                    deptno=row['Dno']
                    dispatcher.utter_message(dept) 
        return []


class ActionGetDoctors(Action):

    def name(self) -> Text:
        return "action_get_doctors"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        global doctor_list
        global flag
        flag=0
        dispatcher.utter_message(text="Getting Doctors.....")
        dept_id=int(deptno)
        
        doctor_list=db.collection(u'Doctors').where(u'dept_id',u'==',dept_id).get()
        button_list=[]
        for d in doctor_list:
            d_name=d.to_dict()['doctor_name']
            fill_slot = '{"doctor" : "' + d_name + '"}'
            button_list.append({"title": d.to_dict()['doctor_name'], "payload": f"/doctor_name{fill_slot}"})
        dispatcher.utter_message(text="Please select the one you meant:", buttons=button_list) 

        return []


class ActionSelectDate(Action):

    def name(self) -> Text:
        return "action_select_date"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        global doc_id
        global flag
        doctor_name=tracker.get_slot('doctor')
        for d in doctor_list:
            if(d.to_dict()['doctor_name']==doctor_name):
                doc_id=d.to_dict()['doctor_id']
                
        global current_doctor
        today=date.today()
        dispatcher.utter_message(text="Date Accessing......")
        current_doctor=db.collection(u'Doctors').document(str(doc_id)).get()
        dispatcher.utter_message(text="Available Dates for booking:")
        button_list=[]
        for i in current_doctor.to_dict():
            if(i.find('day')!= -1):
                if(current_doctor.to_dict()[i]['available']):
                    if(current_doctor.to_dict()[i]['date']!=today.strftime("%Y-%m-%d")):
                        dates=current_doctor.to_dict()[i]['date']
                        fill_slot = '{"date" : "' + dates+ '"}'
                        button_list.append({"title": dates, "payload": f"/choose_date{fill_slot}"})
                        flag=1
        if(flag==0):
            dispatcher.utter_message(text="Doctor not Available this week.")
            return [SlotSet("temp1",True)]
        else:
            dispatcher.utter_message(text="Please select the one you meant:", buttons=button_list) 

        return []

class ActionSelectTimeSlots(Action):

    def name(self) -> Text:
        return "action_select_timeslots"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        global app_day
        global selected_date
        selected_date=tracker.get_slot('date')
        for i in current_doctor.to_dict():
            if(i.find('day')!= -1):
                if(current_doctor.to_dict()[i]['date']==selected_date):
                    app_day=i
                    break
        dispatcher.utter_message(text="Getting Available Slot.......")
        slots=db.collection(u'Doctors').document(str(doc_id)).get()
        slt=slots.to_dict()[str(app_day)]['available']

        if(len(slt)==0):
            dispatcher.utter_message(text="No slots are available on this date.")
            
        else:
            global docs2
            button_list=[]
            for t in slt:
            	docs2=db.collection(u'Slots').document(str(t)).get()
            	time_slots=docs2.to_dict()[u'time']
            	fill_slot = '{"time_slot" : "' + time_slots+ '"}'
            	button_list.append({"title": time_slots, "payload": f"/choosen_timeslot{fill_slot}"})
            dispatcher.utter_message(text="Please select the one you meant:", buttons=button_list)
            	# return [SlotSet("temp1",True)]

        return []

class ActionUserExist(Action):

    def name(self) -> Text:
        return "action_user_exist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            n=tracker.get_slot('name')
            m=tracker.get_slot('contact')
            a=0
            doc=db.collection("Patients").where("mobile_number", "==", m).where("patient_name", "==", n).get()
            for d in doc:
            	a=a+1
            if (a>0):
            	return [SlotSet("user_exist",True)]
            else:
            	return [SlotSet("user_exist",False)]
            	
class ActionCheckUserExistId(Action):

    def name(self) -> Text:
        return "action_check_user_exist_id"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            n=tracker.get_slot('name')
            m=tracker.get_slot('contact')
            a=0
            doc=db.collection("Patients").where("mobile_number", "==", m).where("patient_name", "==", n).get()
            for d in doc:
            	a=a+1
            	p=d.to_dict()['patient_id']
            if (a>0):
            	dispatcher.utter_message(text="Your Patient ID is:"+str(p))
            	return [SlotSet("temp4",True),SlotSet("patient_id",p),SlotSet("user_database",True)]
            else:
            	dispatcher.utter_message(text="Didnt find your patient id")
            	return [SlotSet("temp4",False),SlotSet("patient_id",None)]
            	
class ActionCheckUserDatabase(Action):

    def name(self) -> Text:
        return "action_check_user_database"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            p=tracker.get_slot('patient_id')   
            a=0
            p=int(p)
            doc=db.collection("Patients").where("patient_id", "==", p).get()
            for d in doc:
            	a=a+1
            if (a>0):
            	return [SlotSet("user_database",True)]
            else:
            	dispatcher.utter_message(text="Didnt find your patient id")
            	return [SlotSet("user_database",False),SlotSet("patient_id",None)]
            	
class ActionFillUserSlots(Action):

    def name(self) -> Text:
        return "action_fill_user_slots"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            p=tracker.get_slot('patient_id')   
            a=0
            p=int(p)
            doc=db.collection("Patients").where("patient_id", "==", p).get()
            for d in doc:
            	return [SlotSet("name",d.to_dict()['patient_name']),SlotSet("age",d.to_dict()['age']),SlotSet("gender",d.to_dict()['gender']),SlotSet("contact",d.to_dict()['mobile_number'])]
            	

class ActionBookAppointment(Action):

    def name(self) -> Text:
        return "action_book_appointment"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        selected_slot=tracker.get_slot('time_slot')
        u=tracker.get_slot('user_exist')
        v=tracker.get_slot('user_database')
        docs=db.collection("Slots").where("time", "==", selected_slot).get()
        for d in docs:
        	if(d.to_dict()[u'time']==selected_slot):
        		slot_id=d.to_dict()[u'slot_id']
        		break
        	
        age=tracker.get_slot('age')
        name=tracker.get_slot('name')
        mob_num=tracker.get_slot('contact')
        gender=tracker.get_slot('gender')
        date=tracker.get_slot('date')
        d_name=tracker.get_slot('doctor')
        if (u or v) :
        	doc=db.collection("Patients").where("mobile_number", "==", mob_num).where("patient_name", "==", name).get()
        	for d in doc:
        		pat_id=d.to_dict()['patient_id']
        	if (u):
        		dispatcher.utter_message(text="Your record already exists")
        	data= [{u'doctor_id':doc_id,u'doctor_name':d_name,u'prediction':pred_disease,u'date':date,u'symptom_List':symptoms_exp}]
        	doc=db.collection("Patients").document(str(pat_id)).update({'history':firestore.ArrayUnion(data)})
        else:
        	#Create a new patient id
        	prev_pat_id=db.collection(u'Counter').document(u'count').get()
        	pat_id=prev_pat_id.to_dict()['Last_Patient_id']+1
        	data = {
            	u'patient_id':pat_id,
            	u'age': age ,
            	u'patient_name': name ,
            	u'mobile_number':mob_num,
            	u'gender':gender,
            	u'history':[{u'doctor_id':doc_id,u'doctor_name':d_name,u'prediction':pred_disease,u'date':date,u'symptom_List':symptoms_exp}]
        	}
        	db.collection(u'Patients').document(str(pat_id)).set(data)
        	dispatcher.utter_message(text=("Kindly note down your Patient Id is "+ str(pat_id)))
        	db.collection(u'Counter').document('count').set({u'Last_Patient_id':pat_id})

        doctor_collection=db.collection(u'Doctors').document(str(doc_id)).get()
        slots=db.collection(u'Doctors').document(str(doctor_collection.id))
        slots.update({'{}.available'.format(str(app_day)):firestore.ArrayRemove([slot_id])})
        slots.update({'{}.booked'.format(str(app_day)):firestore.ArrayUnion([slot_id])})
        
        selected_slot=tracker.get_slot('time_slot')
        appointment={
            u'date':selected_date,
            u'patient_id':pat_id,
            u'patient_name':name,
            u'time':selected_slot,
            u'doctor_id':doc_id,
        }
        db.collection(u'Appointment').add(appointment)
        slot_time=tracker.get_slot('time_slot')
        doctor_name=tracker.get_slot('doctor')
        dispatcher.utter_message(text="Appointment Booked Sucessfully")
        dispatcher.utter_message(text="Please note your appointment details:")
        dispatcher.utter_message(text=("Patient Name - "+ str(name)))
        dispatcher.utter_message(text=("Patient Id - "+ str(pat_id)))
        dispatcher.utter_message(text=("Doctor Name - "+ str(doctor_name)))
        dispatcher.utter_message(text=("Slot Time - "+ str(slot_time)))
        dispatcher.utter_message(text=("Appointment Date - "+ str(selected_date)))

        return []
    
    
class Action_Set_True(Action):

    def name(self) -> Text:
        return "action_set_true"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            global temp
            temp=1
            return [SlotSet("temp2",True),SlotSet("age",10)]
            
class Action_Set_True1(Action):

    def name(self) -> Text:
        return "action_set_true1"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            global temp
            temp=1
            return [SlotSet("temp3",True)]
                
class Action_Emergency_Sms(Action):

    def name(self) -> Text:
        return "action_emergency_sms"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            sid='<Your_Key_Here>'
            token='<Your_Key_Here>'
            n=tracker.get_slot('name')
            c=tracker.get_slot('contact')
            b='Emergency Requested from user:'+n+' and contact:'+c
            client=Client(sid,token)
            message = client.messages.create(
            	to='<Your_Number_Here>',
            	from_='<Your_Number_Here>',
            	body=b
            	)
            call = client.calls.create(
            	to='<Your_Number_Here>',
            	from_='<Your_Number_Here>',
            	twiml='<?xml version="1.0" encoding="UTF-8"?><Response><Say loop="2"> The Patient '+n+' has an emergency. Please contact at '+c[0]+' '+c[1]+' '+c[2]+' '+c[3]+' '+c[4]+' '+c[5]+' '+c[6]+' '+c[7]+' '+c[8]+' '+c[9]+' number</Say></Response>'
            	)
            dispatcher.utter_message(text="SMS For Emergency has been sent")
            return []
     
class ValidateFirstNameForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_first_name_form"

    def validate_name(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            global n
            m=tracker.get_slot('name')
            n=m
            return {"name":m}
            	
            
class ValidateLastNameForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_last_name_form"

    def validate_name(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            global n
            new=tracker.get_slot('name')
            if (new.find(n)!= -1):
            	return {"name":None}
            n=n+' '+new
            return {"name":n}
                        	
class ValidatePrimarySymptomForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_primary_symptom_form"

    def validate_primary_symptom(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            disease_input = tracker.get_slot('primary_symptom')
            list1=training.columns.tolist()
            conf,cnf_dis=check_pattern(list1,disease_input)
            if conf==1:
            	return {"primary_symptom":disease_input}
            else:
            	dispatcher.utter_message(text="Please Enter Valid Symptom")
            	return {"primary_symptom":None}
                        		
class ValidateAgeForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_age_form"

    def validate_age(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            a=tracker.get_slot('age')
            global age
            if isinstance(a,list):
            	age=a[0]
            	age=int(age)
            	if (age<=0 or age>130):
            		dispatcher.utter_message(text="Invalid age please write the age again")
            		return {"age":None,"contact":None}
            	else:
            		return {"age":age,"contact":None}
            else:
            	age=a
            	age=int(age)
            	if (age<=0 or age>130):
            		dispatcher.utter_message(text="Invalid age please write the age again")
            		return {"age":None,"contact":None}
            	else:
            		return {"age":age,"contact":None}
            		
class ValidateContactForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_contact_form"

    def validate_contact(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            a=tracker.get_slot('age')
            c=tracker.get_slot('contact')
            global age
            global temp
            if isinstance(c,list):
            	b=c[0]
            	if (len(b)<=9 or len(b)>=11):
            		dispatcher.utter_message(text="Invalid contact please write the contact again(It should be of 10 digits)")
            		return {"age":None,"contact":None}
            	else:
            		if (temp==1):
            			return {"age":None,"contact":b}
            			temp=0
            		return {"age":age,"contact":b}
            else:
            	b=c
            	if (len(b)<=9 or len(b)>=11):
            		dispatcher.utter_message(text="Invalid contact please write the contact again(It should be of 10 digits)")
            		return {"age":None,"contact":None}
            	else:
            		if (temp==1):
            			return {"age":None,"contact":b}
            			temp=0
            		return {"age":age,"contact":b}
            		
class ValidatePatientForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_patient_form"

    def validate_patient_id(self,slot_value: Any, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
            ) -> Dict[Text, Any]:
            p=tracker.get_slot('patient_id')
            a=tracker.get_slot('age')
            c=tracker.get_slot('contact')
            if isinstance(p,list):
            	b=p[0]
            	if (len(b)<=5 or len(b)>=7):
            		dispatcher.utter_message(text="Invalid patient id please write the patient id again(It should be of 6 digits)")
            		return {"patient_id":None,"age":None,"contact":None}
            	else:
            		return {"patient_id":b,"age":None,"contact":None}
            else:
            	b=p
            	if (len(b)<=5 or len(b)>=7):
            		dispatcher.utter_message(text="Invalid patient id please write the patient id again(It should be of 6 digits)")
            		return {"patient_id":None,"age":None,"contact":None}
            	else:
            		return {"patient_id":b,"age":None,"contact":None}
