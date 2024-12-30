import { OpenAI } from 'openai';
import { AIService } from './ai-service.interface';

export class OpenAIService implements AIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateContent(prompt: string, type: 'email' | 'testcase' | 'bugreport' | 'chat'): Promise<string> {
    try {
      const systemPrompt = this.getSystemPrompt(type);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw new Error('INVALID_API_KEY');
        } else if (error.message.includes('429')) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw new Error(`OPENAI_ERROR: ${error.message}`);
      }
      throw new Error('UNEXPECTED_ERROR');
    }
  }

  private getSystemPrompt(type: 'email' | 'testcase' | 'bugreport' | 'chat'): string {
    const prompts = {
      email: 'You are a professional email writer. Format and improve the following content for a professional email.',
      testcase: 'You are a QA engineer. Generate detailed test cases including preconditions, steps, expected results, and edge cases.',
      bugreport: 'You are a QA engineer. Create a detailed Jira bug report including summary, description, steps to reproduce, and expected vs actual results.',
      chat: 'You are a helpful AI assistant with expertise in software development, testing, and automation. Help the user with their questions and provide detailed, accurate responses.'
    };
    return prompts[type];
  }
}