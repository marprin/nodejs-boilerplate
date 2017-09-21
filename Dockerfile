FROM keymetrics/pm2:6
MAINTAINER Marprin Hennes Muchri <marprin93@gmail.com>

RUN mkdir -p /src/app

ADD . /src/app
WORKDIR /src/app
RUN npm install --production

EXPOSE 8432

CMD ["pm2-docker", "start", "pm2.json"]
