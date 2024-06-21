const express = require('express');
const { registerTask, getTasks } = require('../controllers/taskController');

const router = express.Router();

router.post('/task', registerTask);
router.get('/tasks', getTasks);

module.exports = router;
