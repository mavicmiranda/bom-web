import { Outlet } from "react-router-dom";
import Navbar  from "../../components/Navbar";

export default function PublicLayout() {
  return (
    <div>
      <Navbar variant="public"/>
      {/* Header simples (ex: botão login) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
