import React from 'react';
import axios from 'axios';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  const handleUpdate = async (id, updates) => {
    try {
      const response = await axios.put(`/todos/${id}`, updates);
      onUpdateTodo(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      onDeleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleUpdate(todo._id, { completed: !todo.completed })}
          />
          {todo.text}
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
