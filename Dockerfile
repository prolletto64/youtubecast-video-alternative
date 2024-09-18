FROM node:22-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./tsconfig.json ./
COPY ./src ./
RUN npm run build

FROM node:22-alpine
RUN apk add --no-cache yarn ffmpeg python3 py3-pip bash rsync
WORKDIR /app
RUN set -x && \
  wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp && \
  chmod +x ./yt-dlp
COPY ./package.json ./
RUN npm install
COPY --from=build /usr/src/app/dist/index.js ./index.js
ARG NODE_ENV production
EXPOSE 80
CMD ["node","index.js"]
