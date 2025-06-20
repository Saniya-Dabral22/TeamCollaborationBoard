import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const boardId = '664a74ecb0bfc927e0c246e3'; // example board ID

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/boards/${boardId}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      await axios.post(`http://localhost:5000/api/boards/${boardId}/tasks`, task);
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const handleSearch = () => {
    // trigger re-render with filters
    setSearchTerm(searchTerm.trim());
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesText = (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
      return matchesText && matchesPriority;
    })
    .map(task => ({
      ...task,
      title: highlightText(task.title, searchTerm),
      description: highlightText(task.description, searchTerm),
    }));

  const grouped = {
    todo: filteredTasks.filter(t => t.status === 'To Do'),
    pending: filteredTasks.filter(t => t.status === 'Pending'),
    done: filteredTasks.filter(t => t.status === 'Done'),
  };

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <h2 className="text-center my-4">Task Board</h2>

      {/* 🔍 Search and Priority Filter */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Filter by Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* 📋 Task Form */}
      <TaskForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingTask={editingTask}
      />

      {/* 🧱 Task Columns */}
      <div className="row mt-4">
        {['To Do', 'Pending', 'Done'].map(status => (
          <div key={status} className="col-md-4">
            <h4 className="text-center">{status}</h4>
            {(grouped[status.toLowerCase()] || []).map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onEdit={() => setEditingTask(task)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
