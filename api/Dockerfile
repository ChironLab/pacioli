FROM node:16-alpine AS build
ENV NODE_ENV=build
WORKDIR /app
COPY . .
RUN npm install && npm run generate
RUN npm run build

FROM docker/for-desktop-kernel:5.10.47-0b705d955f5e283f62583c4e227d64a7924c138f AS ksrc

FROM ubuntu:latest
ENV PORT=4000
ENV DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/pacioli-web
ENV NODE_ENV=production
WORKDIR /
COPY --from=ksrc /kernel-dev.tar /
RUN tar xf kernel-dev.tar && rm kernel-dev.tar
RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt install -y nodejs bpfcc-tools
WORKDIR /app
COPY --from=build /app/dist .
COPY package.json prisma .
RUN npm install --only=production
RUN npm run migrate
EXPOSE 4000
CMD mount -t debugfs debugfs /sys/kernel/debug && node src/index.js
