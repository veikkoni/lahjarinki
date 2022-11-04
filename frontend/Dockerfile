FROM node:16.13.0-alpine3.12 as build-stage
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.23.2
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./replaceApiAddress.sh /
RUN chmod +x /replaceApiAddress.sh
ENTRYPOINT ["sh", "/replaceApiAddress.sh"]
CMD ["nginx", "-g", "daemon off;"]
