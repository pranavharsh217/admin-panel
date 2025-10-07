import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./components/pages/Dashboard";

// Layout for routes that include sidebar
const SidebarLayout = () => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "80px",
      }}
    >
      <SiteHeader />
      <div className="flex">
        <AppSidebar variant="inset" />
        <div className="flex flex-1 flex-col">
        
          <main className="flex-1 p-4">
            <Outlet /> {/* child routes render here */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <SidebarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/table", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

function App() {
  return (
    <>
      {/* Global toaster for toast notifications */}
      <Toaster position="top-right" />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
