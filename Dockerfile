FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -d nodemon
RUN npm install -d bcrypt
RUN npm install -d redis
CMD ["npm", "run", "start"]