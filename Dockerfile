FROM node:16.3.0-alpine3.13 as javascript
RUN apk add make --no-cache
RUN apk add bash --no-cache