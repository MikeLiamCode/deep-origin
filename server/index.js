const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { TaskSchedulerService } = require('./services/taskSchedulerService');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.listen(port, async () => {
  console.log(`Task Scheduler API listening at http://localhost:${port}`);
  const taskSchedulerService = new TaskSchedulerService();
  await taskSchedulerService.runPendingTasks();
});
