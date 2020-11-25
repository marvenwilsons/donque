FROM node:14 as base
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . /usr/src/nuxt-app/
RUN npm install

# Development
FROM base as dev
ENV NUXT_HOST=localhost
ENV NUXT_PORT=3000
EXPOSE 3000
CMD ["npm","run","dev"]