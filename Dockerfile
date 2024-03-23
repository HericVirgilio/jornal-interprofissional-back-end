FROM node:20.11.0

WORKDIR /usr/src/jornal-api

COPY . .
COPY ./.env.development.local ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm build

CMD ["npm","run","start:prod"]

