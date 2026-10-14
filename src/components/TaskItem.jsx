
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} ${
            task.completed ? "pending" : "completed"
          }`}
        />

        <span className="task-title">{task.title}</span>
      </label>

      <div className="task-actions">
        <span className={`status ${task.completed ? "done" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
