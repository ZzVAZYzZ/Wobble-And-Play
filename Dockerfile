FROM node:21.5.0

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
