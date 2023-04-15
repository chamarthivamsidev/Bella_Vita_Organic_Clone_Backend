FROM node:16
COPY . .
RUN npm install
RUN npm run test
EXPOSE 8000
CMD [ "node", "src/server.js" ]