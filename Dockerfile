FROM node:16

WORKDIR /

COPY . .

WORKDIR /client
RUN yarn install
RUN yarn build

WORKDIR /server
RUN yarn install


EXPOSE 3000