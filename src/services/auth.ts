import CryptoJS from 'crypto-js';
import { API_CONFIG } from '../config/api';

interface AuthResponse {
  success: boolean;
  error?: string;
}

export class AuthService {
  static async verifyPassword(inputPassword: string): Promise<AuthResponse> {
    try {
      // En desarrollo, usamos una contraseña hardcodeada temporalmente
      if (import.meta.env.DEV) {
        const devPassword = 'desarrollo2025';
        return {
          success: inputPassword === devPassword,
          error: inputPassword === devPassword ? undefined : 'Contraseña incorrecta'
        };
      }

      // En producción, verificamos contra el servidor
      const hashedPassword = CryptoJS.SHA256(inputPassword).toString();
      
      const response = await fetch(`${API_CONFIG.baseUrl}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash: hashedPassword }),
      });

      if (!response.ok) {
        throw new Error('Error en la verificación');
      }

      const data = await response.json();
      return {
        success: data.valid,
        error: data.error,
      };
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return {
        success: false,
        error: 'Error en la verificación de la contraseña'
      };
    }
  }
}