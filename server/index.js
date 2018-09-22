const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');
const path = require('path');
const statusRouter = require('./controllers/status');
const projectRouter = require('./controllers/project');
const taskRouter = require('./controllers/task');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/statuses', statusRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});