FROM node
EXPOSE 3001 
WORKDIR /app
COPY . .
RUN npm install
CMD ["node","app.js"]