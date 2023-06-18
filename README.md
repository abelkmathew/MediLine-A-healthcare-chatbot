# MediLine-A-healthcare-chatbot

## Introduction
Hospitals are considered as the primary and the most reliable means of diagnosis for patients around the globe.
The proposed idea of this project is to make it easier for people to access these services
as compared to the conventional way of standing in a queue for hours. Chatbots are
AI programs that are built to automatically engage with the received messages.
This healthcare chatbot system will help the hospitals to provide healthcare support online
24 x 7. 

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

## Working
1. Create a firebase account and get the token.
2. Add these token in react config files.
3. Generate firebase sdk and add those chatbot config.  
4. Create docker files for rasa, rasa-sdk and react.
5. Create and configure twilio token in project files.
6. Run **docker-compose up** to start the project servers.
7. You can access the website with the chatbot at http://localhost:3000/

## Demo 
### Website:
![image1)](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/d3fe2b12-38aa-4c33-97a2-cef9fb54f251)

### Chatbot:
![image2](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/e3e968d5-b120-49da-b01f-87cf2bc55d9b)

![image3](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/366bed2d-c599-42ff-9a83-e412d88ca6b5)

### Doctor Login:
![image4](https://github.com/abelkmathew/MediLine-A-healthcare-chatbot/assets/55405281/190bcc33-d74f-4ce3-80fd-b6d0276f0e68)


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

