const ReportsView = ({ reports, isLoading }) => {
  if (isLoading) {
    return <p className="text-slate-500">Loading reports...</p>;
  }

  if (!reports) {
    return <p className="text-slate-500">No report data available.</p>;
  }

  const stats = [
    { label: 'Total Events', value: reports.total_events },
    { label: 'Total Registrations', value: reports.total_registrations },
    { label: 'Active Users', value: reports.active_users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="p-6 bg-slate-50 rounded-2xl">
          <p className="text-slate-500 text-sm">{stat.label}</p>
          <h4 className="text-3xl font-bold mt-2">{stat.value ?? 0}</h4>
        </div>
      ))}
    </div>
  );
};

export default ReportsView;
