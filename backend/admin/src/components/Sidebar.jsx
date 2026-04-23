const Sidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'events', label: 'Events' },
    { id: 'users', label: 'Users' },
    // { id: 'reports', label: 'Reports' },
  ];

  return (
    <aside className="hidden lg:flex w-72 bg-slate-950 text-white flex-col px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campus Events</h1>
        <p className="text-slate-400 text-sm mt-2">Admin Panel</p>
      </div>

      <div className="mt-10 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full rounded-2xl px-4 py-3 text-left transition ${
              activeTab === item.id
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto rounded-3xl bg-slate-900 p-4 border border-slate-800">
        <p className="text-sm text-slate-400">Logged in as</p>
        <h3 className="font-semibold mt-1">Admin</h3>
        <button
          onClick={onLogout}
          className="mt-3 text-sm text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
