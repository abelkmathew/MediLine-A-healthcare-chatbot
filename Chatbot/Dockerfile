#Extend the official Rasa SDK image
FROM rasa/rasa-sdk:2.8.4

#Use subdirectory as working directory
WORKDIR /app

#Copy any additional custom requirements, if necessary (uncomment next line)
COPY actions/requirements.txt ./

#Change back to root user to install dependencies
USER root

#Copy actions folder to working directory
COPY ./actions /app/actions

RUN /opt/venv/bin/python -m pip install --upgrade pip
#Install extra requirements for actions code, if necessary (uncomment next line)
RUN pip install -r requirements.txt

# RUN /opt/venv/bin/python -m pip install --upgrade pip


#By best practices, don't run the code with root user
USER 1000
