const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');
const path = require('path');
const mongoose = require('mongoose');
const statusRouter = require('./controllers/status');
const projectRouter = require('./controllers/project');
const taskRouter = require('./controllers/task');
const taskboardRouter = require('./controllers/taskboard');

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database', config.mongoUrl);
  })
  .catch(error => {
    console.error(error);
  });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/statuses', statusRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/taskboards', taskboardRouter);

const server = http.createServer(app);

const PORT = config.port;
if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = {
  app, server
};