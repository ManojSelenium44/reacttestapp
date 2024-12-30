import { AIService } from './ai-service.interface';
import { OpenAIService } from './openai.service';
import { GeminiService } from './gemini.service';

export class AIFactory {
  static createService(openAIKey: string, geminiKey: string): AIService {
    const services: AIService[] = [];
    
    if (openAIKey) {
      services.push(new OpenAIService(openAIKey));
    }
    
    if (geminiKey) {
      services.push(new GeminiService(geminiKey));
    }

    if (services.length === 0) {
      throw new Error('No valid API keys provided');
    }

    return new AIServiceWithFallback(services);
  }
}

class AIServiceWithFallback implements AIService {
  constructor(private services: AIService[]) {}

  async generateContent(prompt: string, type: 'email' | 'testcase' | 'bugreport'): Promise<string> {
    let lastError: Error | null = null;

    for (const service of this.services) {
      try {
        return await service.generateContent(prompt, type);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        continue;
      }
    }

    throw lastError || new Error('All AI services failed');
  }
}