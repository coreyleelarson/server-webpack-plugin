import history from 'connect-history-api-fallback';
import express from 'express';
import tasks from './data/tasks.json';

const app = express();

app.get('/api/tasks', (request, response) => {
  response.send({ tasks });
});

app.use(history());
app.use(express.static('build/web'));

app.listen(3000, () => {
  console.log();
  console.log('Application listening on port:', 3000);
  console.log('Press CTRL-C to stop.');
  console.log();
});