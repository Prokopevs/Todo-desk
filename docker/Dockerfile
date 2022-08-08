FROM node:17.3-stretch

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts@5.0.1 -g --silent

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install --silent

COPY public public
COPY src src

CMD ["yarn", "start"]

