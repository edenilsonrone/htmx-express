const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let tasks = [
  {
    id: 1,
    finished: false,
    title: "Primeira task",
  },
  {
    id: 2,
    finished: false,
    title: "Segunda task",
  },
  {
    id: 3,
    finished: true,
    title: "Terceira task",
  },
  {
    id: 4,
    finished: true,
    title: "Quarta task",
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = Math.floor(Math.random() * 100000) + 1
  newTask.finished = false;
  tasks.push(newTask);
  res.status(201).send(tasks);
});


app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks[index].finished = !tasks[index].finished;
  res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});