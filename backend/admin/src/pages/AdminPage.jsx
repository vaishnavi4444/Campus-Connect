import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authApi, eventsApi, usersApi, reportsApi } from '../api';

import LoginForm from '../components/LoginForm';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import EventsTable from '../components/EventsTable';
import UsersTable from '../components/UsersTable';
import ReportsView from '../components/ReportsView';

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();

  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [eventsRes, usersRes, reportsRes] = await Promise.all([
        eventsApi.getAll(),
        usersApi.getAll(),
        reportsApi.get(),
      ]);
      setEvents(eventsRes.data || []);
      setUsers(usersRes.data || []);
      setReports(reportsRes.data || null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = useCallback(async (credentials) => {
    setError('');
    try {
      const data = await authApi.login(credentials);
      const token = data.token || data.data?.token;
      if (!token) throw new Error('No token received from server');
      login(token);
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || err.message || 'Invalid credentials'
      );
    }
  }, [login]);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      logout();
      setEvents([]);
      setUsers([]);
      setReports(null);
      setError('');
    }
  }, [logout]);

  const handleApprove = useCallback(async (eventId) => {
    try {
      await eventsApi.approve(eventId);
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'APPROVED' } : e))
      );
    } catch (err) {
      console.error('Error approving event:', err);
    }
  }, []);

  const handleReject = useCallback(async (eventId) => {
    try {
      await eventsApi.reject(eventId);
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'REJECTED' } : e))
      );
    } catch (err) {
      console.error('Error rejecting event:', err);
    }
  }, []);

  const pendingCount = events.filter((e) => e.status === 'PENDING').length;
  const approvedCount = events.filter((e) => e.status === 'APPROVED').length;

  const stats = {
    pending: pendingCount,
    approved: approvedCount,
    users: reports?.active_users ?? users.length,
    registrations: reports?.total_registrations ?? 0,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}

          <StatsCards stats={stats} />

          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-5">Event Approvals</h3>
              <EventsTable
                events={events.filter((e) => e.status === 'PENDING')}
                onApprove={handleApprove}
                onReject={handleReject}
                isLoading={isLoading}
                emptyMessage="No pending events. All caught up!"
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-5">All Events</h3>
              <EventsTable
                events={events}
                onApprove={handleApprove}
                onReject={handleReject}
                isLoading={isLoading}
                emptyMessage="No events found."
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-5">All Users</h3>
              <UsersTable users={users} isLoading={isLoading} />
            </div>
          )}

          {/* {activeTab === 'reports' && (
            <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-5">Reports</h3>
              <ReportsView reports={reports} isLoading={isLoading} />
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
}
