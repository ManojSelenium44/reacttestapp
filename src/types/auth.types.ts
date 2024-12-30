export interface LoginResponse {
  token: string;
  message?: string;
}

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}