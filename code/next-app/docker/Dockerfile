FROM node:25.9-alpine 

WORKDIR /app



COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install 

COPY . .


