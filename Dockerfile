FROM node:16
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "node", "src/server.js" ]
