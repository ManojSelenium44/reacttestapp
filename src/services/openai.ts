import { OpenAI } from 'openai';

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateContent(prompt: string, type: 'email' | 'testcase' | 'bugreport'): Promise<string> {
    try {
      let systemPrompt = '';
      switch (type) {
        case 'email':
          systemPrompt = 'You are a professional email writer. Format and improve the following content for a professional email.';
          break;
        case 'testcase':
          systemPrompt = 'You are a QA engineer. Generate detailed test cases including preconditions, steps, expected results, and edge cases.';
          break;
        case 'bugreport':
          systemPrompt = 'You are a QA engineer. Create a detailed Jira bug report including summary, description, steps to reproduce, and expected vs actual results.';
          break;
      }

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
          throw new Error('Invalid API key. Please check your OpenAI API key and try again.');
        } else if (error.message.includes('429')) {
          throw new Error('Rate limit exceeded. Please try again in a few moments.');
        }
        throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while connecting to OpenAI.');
    }
  }
}