# MediLine-A-healthcare-chatbot

## Introduction
The most common means that people use to receive healthcare are hospitals. This
has become the norm of all individuals around the world. Hospitals are considered as
the primary and the most reliable means of diagnosis for patients around the globe.
The proposed idea of this project is to make it easier for people to access these services
as compared to the conventional way of standing in a queue for hours. Chatbots are
AI programs that are built to automatically engage with the received messages. These
chatbots connect with potential patients visiting the websites, helping them discover
specialists, booking their appointments, and getting them access to the correct treatment.
This healthcare chatbot system will help the hospitals to provide healthcare support online
24 x 7. This will also help the people get a quick answer to all their queries without any
hassle. The bot will question and record details of patients and get a medical report. In
case the patient wishes to see a specialist, this information will be provided to the doctor
on the day of the appointment. This type of system is less known among the people hence
it is not widely use

## Objective
The primary goal of this project was to create a chatbot for patients which will predict
the disease from the user input by use of an ML model. After the disease diagnosis, the
patient has the option to select the doctor available for that department, then the user
can select the date and time for appointment according to the doctors availability. After
selecting the time slot the appointment for the user is booked.
An added functionality ’Emergency Services’ is also provided by the chatbot in cases
where the patient requires immediate services. In this case an emergency sms and a call
will go to the admin that the user requires emergency services and has to be contacted
immediately using his/her given contact detail.

## Chatbot Prediction Model 
[Colab Notebook](https://colab.research.google.com/drive/1dIA7WBAAAHY2Omzx6ZzijYHlPUZAZH9j?usp=sharing)

## Tools/ Frameworks Used:
- RASA Framework for chatbot
- React Website
- Firebase Database
- Twilio 
- Docker

## Project Description:
The chatbot is created using RASA Framework and we have intergrated that to a react website. In the website a login portal for doctor is created with which the doctors will be able to view the appointment for him for each day along with the  symptoms recorded in the chatbot. We have used firebase as the backend database for storing all the details like patient details, appointment schedules for each doctor etc. Twilio webservice is used to providing emergency sms and calling system. The whole app is containerized using docker for easy deployment and scaling.

## Demo 
### Chatbot:
![image1](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/e3e968d5-b120-49da-b01f-87cf2bc55d9b)

![image2](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/366bed2d-c599-42ff-9a83-e412d88ca6b5)

### Doctor Login:
![image3](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/190bcc33-d74f-4ce3-80fd-b6d0276f0e68)


## Future Scope
* Handling of slots in emergency situations
* Online Consultation

## About Us
MediLine Chatbot was built as part of our final year project. We are grateful to the Computer Science and Engineering Dept. of Rajagiri School of Engineering and Technology for this opportunity and their continuous support.

### Project Team
* Abel Koshy Mathew
* Akhil P Saji
* Alan Varghese Vinu
* Anoop Thomas John 

