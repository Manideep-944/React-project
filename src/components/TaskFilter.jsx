
const filters = ["All", "Pending", "Completed"];

function TaskFilter({ filter, onFilterChange, counts }) {
  return (
    <div className="filters" aria-label="Filter tasks">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          className={`filter-btn ${filter === item ? "active" : ""}`}
          onClick={() => onFilterChange(item)}
          aria-pressed={filter === item}
        >
          {item}
          <span className="filter-count">{counts[item]}</span>
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
