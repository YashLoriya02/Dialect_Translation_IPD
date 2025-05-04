
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Index";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useApp } from "./context/AppContext";
import RecommendedVideos from "./pages/RecommendedVideos";
import RecommendedBlogs from "./pages/RecommendedBlogs";

const queryClient = new QueryClient();

// AuthGuard component to protect routes
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Landing />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <AuthGuard>
                <>
                  <Navbar />
                  <div className="flex-1">
                    <Home />
                  </div>
                </>
              </AuthGuard>
            } />

            <Route path="/search" element={
              <AuthGuard>
                <>
                  <Navbar />
                  <div className="flex-1">
                    <RecommendedVideos />
                  </div>
                </>
              </AuthGuard>
            } />

            <Route path="/blogs" element={
              <AuthGuard>
                <>
                  <Navbar />
                  <div className="flex-1">
                    <RecommendedBlogs />
                  </div>
                </>
              </AuthGuard>
            } />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
