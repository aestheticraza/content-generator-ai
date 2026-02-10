'use client';

import { useState } from 'react';
import Generator from '@/components/Generator';
import HistoryPanel from '@/components/HistoryPanel';
import ImageGenerator from '@/components/ImageGenerator';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [historyTrigger, setHistoryTrigger] = useState(0);

  return (
    <main className="min-h-screen p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          <header className="mb-8">
            <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text tracking-tighter">
              ContentForge AI
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl">
              Create professional, engaging content in seconds with the power of advanced AI models.
            </p>
          </header>

          <Generator onHistoryUpdate={() => setHistoryTrigger(prev => prev + 1)} />

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-white/90">Visual Studio</h2>
            <ImageGenerator />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 h-fit lg:sticky lg:top-8 space-y-6">
          <HistoryPanel refreshTrigger={historyTrigger} />
        </div>
      </div>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      }} />
    </main>
  );
}
