const Sidebar = ({ seasons, onSeasonSelect }) => {
  return (
    <div className="sidebar">
      {seasons.map((season) => (
        <button
          key={season}
          className="sidebar-seasons"
          onClick={() => onSeasonSelect(season)}
        >
          {season}
        </button>
      ))}
    </div>
  );
};

export { Sidebar };
