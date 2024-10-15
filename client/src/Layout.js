import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </main>
  );
}
