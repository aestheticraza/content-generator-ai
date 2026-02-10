export interface HistoryItem {
    id: string;
    type: string;
    content: string;
    createdAt: number;
}

const HISTORY_KEY = 'content-generator-history';

export const getHistory = (): HistoryItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveHistoryItem = (item: HistoryItem) => {
    const history = getHistory();
    const newHistory = [item, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return newHistory;
};

export const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
};
