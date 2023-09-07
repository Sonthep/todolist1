import { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDatetime, setNewDatetime] = useState('');
  const [newPriority, setNewPriority] = useState('A');
  const [editedTask, setEditedTask] = useState('');

  const addTask = (task, datetime, priority, isEditing = false, isComplete = false) => {
    setTasks([...tasks, { task, datetime, priority, isEditing, isComplete }]);
  };

  const deleteTask = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const editTask = (index, editedText) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, task: editedText, isEditing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDatetimeChange = (e) => {
    setNewDatetime(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setNewPriority(e.target.value);
  };

  const handleEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditedTask(tasks[index].task);
  };

  const handleSave = (index) => {
    editTask(index, editedTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask === '') {
      alert('Please enter a task!');
      return;
    }

    addTask(newTask, newDatetime, newPriority);
    setNewTask('');
    setNewDatetime('');
    setNewPriority('A');
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <h1 className=" font-bold mb-4 text-center text-white mt-8 text-[50px]">Todo List</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex justify-center mb-4 max-sm:flex-col space-y-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 rounded-md mr-2 h-10 mt-2"
        />
        <input
          type="datetime-local"
          value={newDatetime}
          onChange={handleDatetimeChange}
          className="border p-2 rounded-md mr-2"
        />
        <select
          value={newPriority}
          onChange={handlePriorityChange}
          className="border p-2 rounded-md mr-2"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 mr-2 rounded-md border-solid border-2 border-white"
        >
          Add Task
        </button>
      </form>
      <ul className="space-y-2 ml-10 mr-10 max-sm:mr-1 max-sm:ml-1">
        {tasks.map((task, index) => (
          <li key={index} className={`bg-white p-2 rounded-md shadow ${task.isComplete ? 'line-through' : ''}`}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => toggleComplete(index)}
              className="mr-2"
            />
            {task.isEditing ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="border p-2 rounded-md mr-2"
              />
            ) : (
              <>
                <span>{task.task}</span>
                <span className="ml-2 text-gray-500">{task.datetime}</span>
                <span className="ml-2 text-gray-500">Priority: {task.priority}</span>
              </>
            )}
            
            {task.isEditing ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 ml-2 rounded-md"
                onClick={() => handleSave(index)}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 ml-2 rounded-md"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 ml-2 rounded-md"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;