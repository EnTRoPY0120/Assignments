const express = require('express');
const path = require('path');
//const fs = require('fs');
const port = process.env.port || 3000;
const data = require('./todos.json');
const app = express();
app.use(express.json());

app.get('/todos', (req, res) => {
  res.status(200).json(data);
});

app.get('/todos/:id', (req, res) => {
  const todoId = data.find((todoId) => todoId.id === parseInt(req.params.id));
  if (!todoId) {
    res.status(404).send('Enter a proper Todo id to display');
  }
  res.status(200).send(data.entries(todoId));
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  }
  data.push(newTodo);
  res.status(201).json(newTodo.id);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = data.findIndex((todoIndex) => todoIndex.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send('Enter the correct Todo');
  }
  else {
    data[todoIndex].title = req.body.title,
      data[todoIndex].description = req.body.description,
      data[todoIndex].completed = req.body.completed
  }
  res.status(200).send(`Todo id:${todoIndex} was updated successfully`)
});

app.delete('/todos/:id', (req, res) => {
  const newId = data.findIndex((index) => index.id === parseInt(req.params.id));
  if (newId === -1) {
    res.status(404).send('Todo was not found');
  }
  data.splice(newId, 1);
  res.status(200).send(`Todo id:${newId} was deleted`);
});

app.all('/*', (req, res) => {
  res.status(404).send('Route not found');
});


app.listen(port, () => {
  console.log(`App is listening on port :${port}`);
});
