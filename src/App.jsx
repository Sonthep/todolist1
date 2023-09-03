import { useState } from 'react';
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDueTime, setNewDueTime] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState('');

  const addTask = (task, dueTime) => {
    setTasks([...tasks, { task, dueTime, completed: false }]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEdit = (index, task, dueTime) => {
    setEditIndex(index);
    setEditTask(task);
    setNewDueTime(dueTime);
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedTasks = tasks.map((item, index) =>
        index === editIndex ? { ...item, task: editTask } : item
      );
      setTasks(updatedTasks);
      setEditIndex(-1);
      setEditTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask, newDueTime);
    setNewTask('');
    setNewDueTime('');
  };

  const updateDueTime = (e) => {
    setNewDueTime(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul className="space-y-2">
        {tasks.map((item, index) => (
          <li key={index} className={`bg-white p-2 rounded-md shadow ${item.completed ? 'line-through' : ''}`}>
            {editIndex === index ? (
              <form onSubmit={updateTask}>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="border p-2 rounded-md mr-2"
                />
                <input
                  type="text"
                  value={newDueTime}
                  onChange={updateDueTime}
                  className="border p-2 rounded-md mr-2"
                  placeholder="Due Time"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span>{item.task}</span>
                {item.dueTime && <span className="text-gray-500 ml-2">({item.dueTime})</span>}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 ml-2 rounded-md"
                  onClick={() => startEdit(index, item.task, item.dueTime)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 ml-2 rounded-md"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="text"
          value={newDueTime}
          onChange={updateDueTime}
          placeholder="Due Time"
          className="border p-2 rounded-md mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
export default TodoList;