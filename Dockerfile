FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY update-env.sh ./update-env.sh
RUN chmod +x ./update-env.sh
RUN ./update-env.sh


CMD ["sh", "-c", "npm run start & npm run bot"]
