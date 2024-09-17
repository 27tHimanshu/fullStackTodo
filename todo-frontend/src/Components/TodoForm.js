import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/todos', { text, completed });
      onAddTodo(response.data);
      setText('');
      setCompleted(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new to-do"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
        Completed
      </label>
      <button type="submit">Add To-Do</button>
    </form>
  );
};

export default TodoForm;
