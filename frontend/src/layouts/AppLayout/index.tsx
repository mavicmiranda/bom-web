import { Outlet } from 'react-router-dom';
import JobModal from '../../components/Kanban/JobModal';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { JobProvider } from '../../contexts/JobContext';

export default function AppLayout() {
  return (
    <JobProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar variant="app" />

          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Modal available globally within the authenticated layout */}
      <JobModal />
    </JobProvider>
  );
}
