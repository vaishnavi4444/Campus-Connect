const StatsCards = ({ stats }) => {
  const cards = [
    { label: 'Pending Events', value: stats.pending, subtext: 'Waiting for approval' },
    { label: 'Approved Events', value: stats.approved, subtext: 'Live on platform' },
    { label: 'Total Users', value: stats.users, subtext: 'Students & organizers' },
    { label: 'Registrations', value: stats.registrations, subtext: 'Across all events' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-sm"
        >
          <p className="text-slate-500 text-sm">{card.label}</p>
          <h3 className="text-4xl font-bold mt-3">{card.value ?? 0}</h3>
          <p className="text-sm text-slate-400 mt-2">{card.subtext}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
