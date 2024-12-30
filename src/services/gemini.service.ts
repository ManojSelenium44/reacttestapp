import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIService } from './ai-service.interface';

export class GeminiService implements AIService {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string, type: 'email' | 'testcase' | 'bugreport' | 'chat'): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
      const systemPrompt = this.getSystemPrompt(type);
      
      const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('INVALID_API_KEY');
        } else if (error.message.includes('quota')) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw new Error(`GEMINI_ERROR: ${error.message}`);
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