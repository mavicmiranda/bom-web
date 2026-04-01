import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiHome, FiUser, FiArrowRight, FiArrowLeft, FiTrendingUp, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className= {`sidebar ${collapsed ? "w-20" : "w-64"} flex flex-col h-screen`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-lg text-gradient">
          {collapsed ? "CI" : "Carreira Inteligente"}
        </h1>

        <button onClick={() => setCollapsed(!collapsed)} className="btn-ghost">
          {collapsed ? <FiArrowRight /> : <FiArrowLeft />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
          }
        >
          <FiHome />
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/profile" onClick={() => navigate("/profile")}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "sidebar-item-active" : ""}` 
          }
        >
          <FiUser />
          {!collapsed && <span>Perfil</span>}
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
          }
        >
          <FiTrendingUp />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-6">
        <div className="sidebar-item">
          <FiSettings />
          {!collapsed && <span>Configurações</span>}
        </div>
      </div>
    </aside>
  );
}
