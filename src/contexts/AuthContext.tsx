import { createContext, ReactNode, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        console.log(user)
      }
    } catch (error) {
      throw error
    }
  }

	return (
		<AuthContext.Provider value={{
      user,
      signIn
		}}>
			{children}
		</AuthContext.Provider>
	);
}