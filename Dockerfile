FROM node:22-alpine

RUN mkdir -p /home/app
  # set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

EXPOSE 3000

CMD ["node"]