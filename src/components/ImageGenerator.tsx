'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const generateImage = async () => {
        if (!prompt) return;

        setLoading(true);
        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            if (data.url) {
                setImage(data.url);
                toast.success('Image generated!');
            } else {
                toast.error('Failed to generate image');
            }
        } catch (e) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!image) return;
        const link = document.createElement('a');
        link.href = image;
        link.download = `generated-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-lg text-white">AI Image Generator</h3>

            <div className="flex gap-2">
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want..."
                    className="flex-1 p-3 rounded-lg glass-input"
                />
                <button
                    onClick={generateImage}
                    disabled={loading || !prompt}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? 'Thinking...' : 'Generate'}
                </button>
            </div>

            {image && (
                <div className="relative group rounded-xl overflow-hidden mt-4 border border-white/10">
                    <img src={image} alt="Generated" className="w-full h-auto object-cover" />
                    <button
                        onClick={downloadImage}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Download size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
