FROM node:latest

WORKDIR /app

COPY package.json .

USER root

RUN npm install -g npm@8.6.0

RUN npm i --legacy-peer-deps

COPY . .

EXPOSE 5005

CMD ["npm", "start"]

USER 1000
