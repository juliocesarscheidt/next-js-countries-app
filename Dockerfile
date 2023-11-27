FROM node:20-alpine
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .
# RUN npm run build

EXPOSE 3030

CMD ["npm", "run", "dev"]
