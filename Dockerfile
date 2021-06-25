# build environment
FROM node:16.3.0-alpine as build
ARG API_URL=http://localhost:8000
ENV REACT_APP_API_URL=${API_URL}
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]