FROM node:14.17.6-stretch as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

COPY public public
COPY src src

CMD ["npm", "start"]

