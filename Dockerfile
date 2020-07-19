# BASE IMAGE
FROM node:12.18.2-alpine3.9

# SET ENVIRONMENT
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

# ADD ADDITIONAL LIBRARIES
RUN apk update && \
    apk upgrade && \
    apk add git 

# CREATE A FOLDER FOR THE NUXT APP
RUN mkdir -p /usr/src/nuxt-app

# NOW WORK FROM THE APP DIRECTORY
WORKDIR /usr/src/nuxt-app

# COPY CODE INTO THE APP DIRECTORY
COPY . .

# INSTALL NODE MODULES
RUN npm install

# BUILD THE APP
RUN npm run build

# RUN THE APP
CMD ["npm", "start"]