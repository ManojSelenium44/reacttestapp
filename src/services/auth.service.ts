import { APIService } from './api.service';
import { LoginResponse } from '../types/auth.types';

export class AuthService {
  static async login(username: string, password: string): Promise<LoginResponse> {
    try {
      return await APIService.request<LoginResponse>('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      await APIService.request('/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}