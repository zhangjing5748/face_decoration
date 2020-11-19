FROM node
WORKDIR /package
COPY package.json /package/
COPY package-lock.json /package/
RUN npm install
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cp -a  /package/node_modules  /usr/src/app
# RUN npm install
RUN npm run build
# RUN ls /usr/src/app/dist
FROM nginx
COPY  --from=0 /usr/src/app/dist /usr/share/nginx/html/webar/wishes
# COPY  --from=0 /usr/src/app/dist /usr/share/nginx/html/webar/gugong_calendar
# COPY  --from=0 /usr/src/app/dist /usr/share/nginx/html/webar/webartest
COPY  --from=0 /usr/src/app/nginx/mime.types  /etc/nginx
COPY  --from=0 /usr/src/app/nginx/default.conf  /etc/nginx/conf.d



