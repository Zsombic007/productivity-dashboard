import { useState } from 'react'  
import SideBar from '../SideBar/sidebar.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


const priorityEmojis = {
  'VERY IMPORTANT': '🔴',
  'DO IT ALREADY': '🟠',
  'IT CAN WAIT': '🟡'
};

function AddTodoModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('IT CAN WAIT');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({ title, priority, dueDate });
      setTitle('');
      setPriority('IT CAN WAIT');
      setDueDate('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-3xl p-6 w-96 border-2">
        <FontAwesomeIcon icon={faCirclePlus} />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Task</h2>

        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task description..."
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-500"
          >
            <option value="VERY IMPORTANT">🔴 VERY IMPORTANT</option>
            <option value="DO IT ALREADY">🟠 DO IT ALREADY</option>
            <option value="IT CAN WAIT">🟡 IT CAN WAIT</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Add Task
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function TODOList() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTodo = (todoData) => {
    setTodos([...todos, { id: Date.now(), ...todoData, completed: false }]);
    setIsModalOpen(false);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSortedTodos = () => {
    return [...todos].sort((a, b) => {
      // Todos without dates go to the bottom
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      // Sort by closest date first
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded-lg shadow-lg m-5 p-5 w-96 h-fit">
      <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-4">TO-DO List</h2>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mb-4"
      >
        + Add New Task
      </button>

      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTodo}
      />

      <div className="space-y-2">
        {getSortedTodos().map(todo => (
          <div key={todo.id} className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 cursor-pointer mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{priorityEmojis[todo.priority]}</span>
                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white font-semibold'}`}>
                  {todo.title}
                </span>
              </div>
              {todo.dueDate && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  📅 Due: {formatDate(todo.dueDate)}
                </div>
              )}
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 text-sm whitespace-nowrap"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Dashboard() {
  return(
    <div className="h-screen w-screen bg-gray-200 dark:bg-gray-800 flex">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <h1 className="light:text-black dark:text-white font-bold text-4xl p-5">Dashboard</h1>
          <TODOList />
        </div>
    </div>
  )
}