// ToDoList.js
import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks];
      if (editIndex !== null) {
        // If editing, update the existing task
        updatedTasks[editIndex].text = newTask;
        setEditIndex(null);
      } else {
        // If not editing, add a new task
        updatedTasks.push({ text: newTask, isCompleted: false });
      }
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(updatedTasks);
  };

  const hasCompletedTasks = tasks.some((task) => task.isCompleted);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">To Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={addTask}
          className="default-button" 
        >
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`${
              task.isCompleted ? 'line-through text-gray-500' : ''
            } mb-2 border px-4 py-2 flex items-center justify-between`}
          >
            <span>{task.text}</span>
            <div className="mt-1 space-x-2">
              <button
                type="button"
                onClick={() => editTask(index)}
                className="default-button" 
              >
                Edit
              </button>
              <button
                onClick={() => removeTask(index)}
                className="default-button" 
              >
                Delete
              </button>
            </div>
            
          </li>
        ))}
      </ul>
      {hasCompletedTasks && (
        <button
          onClick={clearCompleted}
          className="default-button" 
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default ToDoList;
