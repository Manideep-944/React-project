
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./App.css";

const STORAGE_KEY = "react-task-manager-tasks";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const data = JSON.parse(saved);

    if (!Array.isArray(data)) return [];

    return data.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean"
    );
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("All");

  // Save tasks whenever the task list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  // Add a task.
  function addTask(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  }

  // Complete or reopen a task.
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task.
  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const counts = {
    All: totalTasks,
    Pending: pendingTasks,
    Completed: completedTasks,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>TaskFlow</span>
        </div>
        <span className="header-label">DAILY PLANNER</span>
      </header>

      <section className="welcome">
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Make today count.</h1>
        <p className="subtitle">
          Organize your tasks, track your progress, and get things done.
        </p>
      </section>

      <section className="stats" aria-label="Task statistics">
        <article className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <strong>{totalTasks}</strong>
          <span className="stat-note">All your tasks</span>
        </article>

        <article className="stat-card">
          <span className="stat-label">Completed</span>
          <strong className="completed-number">{completedTasks}</strong>
          <span className="stat-note">Tasks finished</span>
        </article>

        <article className="stat-card">
          <span className="stat-label">Pending</span>
          <strong className="pending-number">{pendingTasks}</strong>
          <span className="stat-note">Still to do</span>
        </article>
      </section>

      <section className="task-panel">
        <div className="panel-heading">
          <div>
            <h2>My Tasks</h2>
            <p>One step at a time.</p>
          </div>
          <span className="task-total">{totalTasks} total</span>
        </div>

        <TaskForm onAddTask={addTask} />

        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {totalTasks > 0 && (
          <footer className="task-footer">
            <span>{pendingTasks} tasks remaining</span>
            <span>
              {Math.round((completedTasks / totalTasks) * 100)}% completed
            </span>
          </footer>
        )}
      </section>

      <footer className="app-footer">
        Built with React | Tasks saved on this device
      </footer>
    </main>
  );
}

export default App;
