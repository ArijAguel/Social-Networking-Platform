FROM node:lts-alpine as build

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build



# Path: nginx.conf
FROM nginx:stable-alpine
COPY --from=build /app/dist/digital-incubator-front-angular/ /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf


COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 8085

CMD ["nginx", "-g", "daemon off;"]
