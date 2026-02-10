'use client';

import { useEffect, useState } from 'react';
import { HistoryItem, getHistory, clearHistory } from '@/lib/history';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
    refreshTrigger: number;
}

export default function HistoryPanel({ refreshTrigger }: HistoryPanelProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, [refreshTrigger]);

    const handleClear = () => {
        if (confirm('Are you sure you want to clear history?')) {
            clearHistory();
            setHistory([]);
        }
    };

    return (
        <div className="glass-panel p-4 h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-blue-400" />
                    History
                </h3>
                {history.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="overflow-y-auto flex-1 space-y-3 pr-2 custom-scrollbar">
                {history.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-8">
                        No history yet
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-blue-500/30 group"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    {item.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-2 mt-2 group-hover:text-white transition-colors">
                                {item.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
