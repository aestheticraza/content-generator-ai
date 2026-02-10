'use client';

import { useState } from 'react';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import { saveHistoryItem, HistoryItem } from '@/lib/history';
import ContentTypeSelector from './ContentTypeSelector';
import OutputDisplay from './OutputDisplay';
import { Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface GeneratorProps {
    onHistoryUpdate: () => void;
}

export default function Generator({ onHistoryUpdate }: GeneratorProps) {
    const {
        content,
        isLoading,
        generate,
        prompt,
        handleInputChange,
        contentType,
        setContentType,
        tone,
        setTone,
        length,
        setLength
    } = useContentGenerator({
        onFinish: (prompt, completion) => {
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                type: contentType,
                content: completion,
                createdAt: Date.now(),
            };
            saveHistoryItem(newItem);
            onHistoryUpdate();
            toast.success('Generated successfully!');
        },
    });

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <div className="glass-panel p-6 space-y-6">
                <ContentTypeSelector selected={contentType} onSelect={setContentType} />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Tone</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full p-3 rounded-xl glass-input appearance-none text-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Professional">Professional</option>
                            <option value="Casual">Casual</option>
                            <option value="Formal">Formal</option>
                            <option value="Enthusiastic">Enthusiastic</option>
                            <option value="Witty">Witty</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Length</label>
                        <select
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full p-3 rounded-xl glass-input appearance-none text-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Short">Short</option>
                            <option value="Medium">Medium</option>
                            <option value="Long">Long</option>
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={handleInputChange}
                        placeholder="Describe what you want to create..."
                        className="w-full h-32 p-4 rounded-xl glass-input resize-none text-lg placeholder-gray-500"
                    />
                    <button
                        onClick={generate}
                        disabled={isLoading || !prompt.trim()}
                        className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Generate
                            </>
                        )}
                    </button>
                </div>
            </div>

            <OutputDisplay content={content} />
        </div>
    );
}
