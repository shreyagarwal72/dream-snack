import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Intro from "./pages/Intro";
import Admin from "./pages/Admin";
import { AIAssistant } from "./components/AIAssistant";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { GlassProvider } from "./contexts/GlassContext";
import { GlassBackground } from "./components/GlassBackground";

const queryClient = new QueryClient();

const INTRO_SEEN_KEY = 'dreamsnack_intro_seen';

// Component to handle first visit redirect
const HomeRoute = () => {
  const introSeen = localStorage.getItem(INTRO_SEEN_KEY);
  if (!introSeen) {
    return <Navigate to="/intro" replace />;
  }
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlassProvider>
      <TooltipProvider>
        <GlassBackground />
        <ScrollProgressBar />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </GlassProvider>
  </QueryClientProvider>
);

export default App;
