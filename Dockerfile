FROM node:22-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./tsconfig.json ./
COPY ./src ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY --from=build /usr/src/app/dist/index.js ./index.js
ARG NODE_ENV production
EXPOSE 80
CMD ["node","index.js"]
