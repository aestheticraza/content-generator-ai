import { createOpenAI } from '@ai-sdk/openai';

export const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export const contentConfig = {
    blog: {
        systemPrompt: "You are a professional blog writer. Create engaging, well-structured, and SEO-optimized blog posts.",
        model: "gpt-4-turbo"
    },
    social: {
        systemPrompt: "You are a social media expert. Create catchy, viral-ready posts with appropriate hashtags and emojis.",
        model: "gpt-4-turbo"
    },
    code: {
        systemPrompt: "You are a senior software developer. Write clean, efficient, and well-documented code with best practices.",
        model: "gpt-4-turbo"
    },
    email: {
        systemPrompt: "You are a professional email copywriter. Write clear, persuasive, and professional emails.",
        model: "gpt-4-turbo"
    },
    product: {
        systemPrompt: "You are a product marketing expert. Write compelling product descriptions that convert.",
        model: "gpt-4-turbo"
    }
};
