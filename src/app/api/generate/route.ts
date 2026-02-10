import { openai, contentConfig } from '@/lib/ai-config';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt, contentType, tone, length } = await req.json();
  const config = contentConfig[contentType as keyof typeof contentConfig] || contentConfig.blog;

  const refinedPrompt = `
      Create a ${contentType} content.
      Topic/Prompt: ${prompt}
      Tone: ${tone || 'Professional'}
      Length: ${length || 'Medium'}
      
      Additional Instructions: ${config.systemPrompt}
    `;

  const result = streamText({
    model: openai(config.model),
    system: "You are an expert AI content generator. Follow the user's requirements strictly.",
    prompt: refinedPrompt,
  });

  return result.toTextStreamResponse();
}
