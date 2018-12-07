import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!!!');
});

app.listen(3000, () => {
  console.log('Application listening on port:', 3000);
});