import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Copy, Download, Check, FileDown, FileType } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportToPDF, exportToMarkdown } from '@/lib/export';

interface OutputDisplayProps {
    content: string;
}

export default function OutputDisplay({ content }: OutputDisplayProps) {
    const [htmlContent, setHtmlContent] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const parseMarkdown = async () => {
            const parsed = await marked.parse(content);
            setHtmlContent(parsed);
        };
        parseMarkdown();
    }, [content]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportPDF = () => {
        if (!content) return;
        toast.promise(
            exportToPDF('generated-content', `content-${Date.now()}`),
            {
                loading: 'Generating PDF...',
                success: 'PDF downloaded!',
                error: 'Failed to generate PDF',
            }
        );
    };

    const handleExportMarkdown = () => {
        if (!content) return;
        exportToMarkdown(content, `content-${Date.now()}`);
        toast.success('Markdown downloaded!');
    };

    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const charCount = content.length;

    return (
        <div className="glass-panel p-6 mt-6 relative min-h-[300px]">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <div className="flex gap-4 text-sm text-gray-400">
                    <span>{wordCount} words</span>
                    <span>{charCount} chars</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExportPDF}
                        disabled={!content}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                        title="Export as PDF"
                    >
                        <FileDown size={18} />
                    </button>
                    <button
                        onClick={handleExportMarkdown}
                        disabled={!content}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                        title="Export as Markdown"
                    >
                        <FileType size={18} />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
            </div>

            <div
                id="generated-content"
                className="prose prose-invert max-w-none text-gray-200 p-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {!content && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 italic">
                    AI generated content will appear here...
                </div>
            )}
        </div>
    );
}
