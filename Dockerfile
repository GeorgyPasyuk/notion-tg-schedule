FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "DATABASE_ID=\$(npm run init-db)" >> .env

CMD ["sh", "-c", "npm run start & npm run bot"]
