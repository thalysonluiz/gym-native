import { createContext, ReactNode, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Thalyson',
    email: 'thalyson@example.com',
    avatar: 'https://example.com/photo.jpg'
  })

  function signIn(email: string, password: string) {
    console.log('signing in')
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