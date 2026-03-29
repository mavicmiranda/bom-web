// import { Link, useLocation } from "react-router-dom";
// import "./sidebar.css";

// const Sidebar = () => {
//   const location = useLocation();

//   const menu = [
//     { name: "Meu Perfil", path: "/profile" },
//     { name: "Dashboard", path: "/home" },
//     { name: "Vagas", path: "/jobs" },
//     { name: "Kanban", path: "/kanban" },
//   ];

//   return (
//     <aside style={styles.sidebar}>
//       <h2 style={styles.logo}>Carreira+</h2>

//       <nav>
//         {menu.map((item) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               style={{
//                 ...styles.link,
//                 ...(isActive ? styles.active : {}),
//               }}
//             >
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


// const styles = {
//   sidebar: {
//     width: "240px",
//     height: "100vh",
//     background: "#1e1e2f",
//     color: "#fff",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column" as const,
//   },
//   logo: {
//     marginBottom: "30px",
//   },
//   link: {
//     display: "block",
//     padding: "10px",
//     marginBottom: "10px",
//     borderRadius: "8px",
//     textDecoration: "none",
//     color: "#fff",
//   },
//   active: {
//     background: "#6c63ff", // roxo 🔥
//   },
// };

import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-screen bg-zinc-900 text-white p-4
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex justify-between items-center">
        <h1 className="font-headline">
          {collapsed ? "CI" : "Carreira Inteligente"}
        </h1>

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-4">
        <a className="flex gap-3 hover:text-purple-400">
          🏠 {!collapsed && "Home"}
        </a>

        <a className="flex gap-3 hover:text-purple-400">
          👤 {!collapsed && "Perfil"}
        </a>
      </nav>
    </aside>
  );
}