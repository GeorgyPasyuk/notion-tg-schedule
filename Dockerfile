FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node typescript

COPY . .

RUN echo "DATABASE_ID=\$(npm run init-db)" >> .env

CMD ["sh", "-c", "npm run start & npm run bot"]
