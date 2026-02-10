'use client';

import {
    FileText,
    Share2,
    Code,
    Mail,
    ShoppingBag
} from 'lucide-react';
// import { motion } from 'framer-motion';

const types = [
    { id: 'blog', label: 'Blog Post', icon: FileText },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'product', label: 'Product', icon: ShoppingBag },
];

interface ContentTypeSelectorProps {
    selected: string;
    onSelect: (type: string) => void;
}

export default function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {types.map((type) => {
                const Icon = type.icon;
                const isSelected = selected === type.id;

                return (
                    <button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className={`
              flex flex-col items-center justify-center p-4 min-w-[100px] rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95
              ${isSelected ? 'bg-blue-600 shadow-lg' : 'glass-panel hover:bg-white/10'}
            `}
                    >
                        <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {type.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
