FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run init-db

CMD ["sh", "-c", "npm run start & npm run bot"]
