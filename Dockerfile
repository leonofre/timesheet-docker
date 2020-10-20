FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -d nodemon
CMD ["npm", "run", "start"]