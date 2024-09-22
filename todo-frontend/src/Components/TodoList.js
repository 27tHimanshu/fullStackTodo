import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [editTodo, setEditTodo] = useState(null); // New state for editing
  const [editInputValue, setEditInputValue] = useState(''); // New state for edited text
   
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/todos', {
        text: inputValue,
        completed: isCompleted,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setInputValue(''); // Clear the input after submission
      setIsCompleted(false); // Reset the checkbox
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleTickChange = async (e, todo) => {
    const updatedCompleted = e.target.checked;
    try {
      const response = await axios.put(`/todos/${todo._id}`, {
        completed: updatedCompleted,
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === todo._id ? response.data : t))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todo) => {
    try {
      await axios.delete(`/todos/${todo._id}`);
      setTodos((prevTodos) => prevTodos.filter((currTodo) => currTodo._id !== todo._id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditSubmit = async (todo) => {
    try {
      const response = await axios.put(`/todos/${todo._id}`, {
        text: editInputValue,
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === todo._id ? response.data : t))
      );
      setEditTodo(null); // Reset edit state
      setEditInputValue(''); // Clear the edit input
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="outer">
      <div className="todobox">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter To-do"
          onChange={handleChange}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          Mark as completed
        </label>
        <button className="submit-button" onClick={handleSubmit}>Add To-Do</button>
        <div className="todos">
          <ul>
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                {editTodo === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editInputValue}
                      onChange={handleEditChange}
                      placeholder="Update todo"
                    />
                    <button onClick={() => handleEditSubmit(todo)}>Update</button>
                  </>
                ) : (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => handleTickChange(e, todo)}
                      />
                      {todo.text}
                    </label>
                    <button onClick={() => { setEditTodo(todo._id); setEditInputValue(todo.text); }}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(todo)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
