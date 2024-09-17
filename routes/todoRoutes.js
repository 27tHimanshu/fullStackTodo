const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new To-Do

router.post('/todos', async (req, res) => {
    try {
      const newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed || false // Set default if not provided
      });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        res.status(400).json({ error: 'Validation failed:', errors }); 
      } else {
        console.error(err); // Log the actual error for debugging
        res.status(500).json({ error: 'Failed to create to-do' });
      }
    }
  });

// Get all To-Dos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Couldn\'t get all todos' });
  }
});

// Update a To-Do by ID
router.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);  // Change from 'error' to 'err'
    res.status(500).json({ error: 'Couldn\'t update the todo' });
  }
});

// Delete a To-Do by ID
router.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'To-Do deleted successfully' });
  } catch (err) {
    console.log(err);  // Change from 'error' to 'err'
    res.status(500).json({ error: 'Couldn\'t delete the todo' });
  }
});

module.exports = router;
