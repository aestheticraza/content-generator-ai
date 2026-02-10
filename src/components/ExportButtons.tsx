'use client';

export default function ExportButtons() {
    return (
        <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Export PDF</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Export Markdown</button>
        </div>
    );
}
