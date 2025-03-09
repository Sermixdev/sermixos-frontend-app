import React, { useState } from 'react';
import styled from 'styled-components';
import { Shield, AlertCircle } from 'lucide-react';
import { getEnvironmentConfig } from '../../config/environment';
import { AuthService } from '../../services/auth';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000080;
  padding: 20px;
`;

const AuthBox = styled.div`
  background-color: #c0c0c0;
  padding: 2rem;
  border: 2px solid #000000;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  color: #000080;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 2px solid #808080;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-family: inherit;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #000080;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #000080;
  color: white;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #0000a0;
  }

  &:disabled {
    background-color: #808080;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  background-color: #ffe6e6;
  padding: 0.5rem;
  border: 1px solid #ffb3b3;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface PasswordProtectionProps {
  onAuthenticate: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const config = getEnvironmentConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const authResponse = await AuthService.verifyPassword(password);
      
      if (authResponse.success) {
        sessionStorage.setItem('isAuthenticated', 'true');
        onAuthenticate();
      } else {
        setError(authResponse.error || 'La contraseña es incorrecta');
      }
    } catch (error) {
      setError('Error en la autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <Title>
          <Shield size={24} />
          Entorno de Desarrollo
        </Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <Button type="submit" disabled={isLoading || !password}>
            {isLoading ? 'Verificando...' : 'Acceder'}
          </Button>
          {error && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}
        </Form>
      </AuthBox>
    </AuthContainer>
  );
};

export default PasswordProtection;