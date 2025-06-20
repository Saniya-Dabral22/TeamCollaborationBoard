import React from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        {/* Title and Description with highlighted search */}
        <h5
          className="card-title"
          dangerouslySetInnerHTML={{ __html: task.title }}
        />
        <p
          className="card-text"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />

        {/* Status and Priority */}
        <div className="mb-2">
          <span className="badge bg-info me-2">Status: {task.status}</span>
          <span className="badge bg-warning text-dark">Priority: {task.priority}</span>
        </div>

        {/* Assigned To */}
        {task.assigned_to && (
          <p className="mb-1">
            <strong>Assigned to:</strong> {task.assigned_to}
          </p>
        )}

        {/* Due Date */}
        {task.due_date && (
          <p className="mb-2">
            <strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}
          </p>
        )}

        {/* Edit & Delete Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-sm btn-outline-primary"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
