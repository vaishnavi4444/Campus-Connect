const EventsTable = ({ events, onApprove, onReject, isLoading, emptyMessage = 'No events to display.' }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (isLoading) {
    return <p className="text-slate-500">Loading events...</p>;
  }

  if (!events || events.length === 0) {
    return <p className="text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 text-sm text-left">
            <th className="pb-4">Event</th>
            <th className="pb-4">Organizer</th>
            <th className="pb-4">Date</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-slate-100">
              <td className="py-5">
                <p className="font-semibold">{event.title}</p>
              </td>
              <td className="py-5 text-slate-600">
                {event.organizer?.name || 'N/A'}
              </td>
              <td className="py-5 text-slate-600">
                {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
              </td>
              <td className="py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(event.status)}`}
                >
                  {event.status}
                </span>
              </td>
              <td className="py-5">
                {event.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onApprove(event.id)}
                      className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(event.id)}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
