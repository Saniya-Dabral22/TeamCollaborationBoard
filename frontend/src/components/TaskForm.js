import React, { useEffect, useState } from 'react';

const TaskForm = ({ onCreate, onUpdate, editingTask, boardId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    assigned_to: '',
    due_date: ''
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Low',
        assigned_to: '',
        due_date: ''
      });
    }
  }, [editingTask]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return alert('Task title is required');
    }

    if (editingTask) {
      onUpdate(editingTask._id, formData);
    } else {
      onCreate(boardId, formData); // pass boardId to onCreate
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-3">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Task Title"
          className="form-control"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Task Description"
          className="form-control"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Assigned To"
          className="form-control"
          value={formData.assigned_to}
          onChange={e => setFormData({ ...formData, assigned_to: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          value={formData.priority}
          onChange={e => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          value={formData.due_date}
          onChange={e => setFormData({ ...formData, due_date: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          <option>To Do</option>
          <option>Pending</option>
          <option>Done</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
