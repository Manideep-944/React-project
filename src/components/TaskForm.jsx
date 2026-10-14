
import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title cannot be empty!");
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrap">
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          maxLength={150}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          aria-label="Task title"
          aria-invalid={Boolean(error)}
        />

        <button type="submit" className="add-btn">
          + Add Task
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default TaskForm;
