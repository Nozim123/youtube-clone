import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Channel from './pages/Channel';
import NotFound from './pages/NotFound';
import { cn } from './lib/utils';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        className={cn(
          'pt-14 transition-all duration-300',
          sidebarOpen ? 'ml-0 md:ml-60' : 'ml-0 md:ml-16'
        )}
      >
        <div className="container mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/channel/:channelId" element={<Channel />} />
            {/* Placeholder routes for sidebar links */}
            <Route path="/trending" element={<Home />} />
            <Route path="/subscriptions" element={<Home />} />
            <Route path="/history" element={<Home />} />
            <Route path="/liked" element={<Home />} />
            <Route path="/playlists" element={<Home />} />
            <Route path="/settings" element={<Home />} />
            <Route path="/help" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
