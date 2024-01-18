#  geo_core layer
#  build on a node image, in turn built on alpine linux, Docker's official linux pulled from hub.docker.com
FROM node:10.16.0-alpine

#  add libraries; sudo so non-root user added downstream can get sudo
RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python \
    ;

#  add glibc and install canvas
RUN apk --no-cache add ca-certificates wget  && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
    apk add glibc-2.29-r0.apk && \
    npm install canvas@2.5.0 \
    ;

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
