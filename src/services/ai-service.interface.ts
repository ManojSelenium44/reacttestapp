export interface AIService {
  generateContent(prompt: string, type: 'email' | 'testcase' | 'bugreport' | 'chat'): Promise<string>;
}