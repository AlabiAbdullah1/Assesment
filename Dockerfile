FROM node:14
WORKDIR C:\Users\hp\Desktop\Job>
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]