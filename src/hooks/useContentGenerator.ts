import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';

interface UseContentGeneratorProps {
    onFinish?: (prompt: string, completion: string) => void;
}

export function useContentGenerator({ onFinish }: UseContentGeneratorProps = {}) {
    const [contentType, setContentType] = useState('blog');
    const [tone, setTone] = useState('Professional');
    const [length, setLength] = useState('Medium');

    const {
        completion,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
        setInput
    } = useCompletion({
        api: '/api/generate',
        body: {
            contentType,
            tone,
            length,
        },
        onFinish: (prompt, completion) => {
            onFinish?.(prompt, completion);
        },
        onError: (error) => {
            console.error('Generation error:', error);
        }
    });

    return {
        content: completion,
        isLoading,
        generate: handleSubmit,
        stop,
        prompt: input,
        setPrompt: setInput,
        handleInputChange,
        contentType,
        setContentType,
        tone,
        setTone,
        length,
        setLength
    };
}
