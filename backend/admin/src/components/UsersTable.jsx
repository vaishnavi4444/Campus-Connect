const UsersTable = ({ users, isLoading }) => {
  const getRoleClass = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700';
      case 'ORGANIZER':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (isLoading) {
    return <p className="text-slate-500">Loading users...</p>;
  }

  if (!users || users.length === 0) {
    return <p className="text-slate-500">No users to display.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 text-sm text-left">
            <th className="pb-4">Name</th>
            <th className="pb-4">Email</th>
            <th className="pb-4">Role</th>
            <th className="pb-4">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-slate-100">
              <td className="py-4 font-medium">{user.name}</td>
              <td className="py-4 text-slate-600">{user.email}</td>
              <td className="py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getRoleClass(user.role)}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-4 text-slate-600">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
