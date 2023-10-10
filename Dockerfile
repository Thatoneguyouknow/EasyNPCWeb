FROM node:18-alpine
RUN npm install -g @angular/cli
WORKDIR /EasyNPCWeb
COPY package.json .
RUN npm install
COPY . .
CMD ng serve --host 0.0.0.0 --port 4200