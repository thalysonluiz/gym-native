import { createContext, ReactNode, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextDataProps = {
  user: UserDTO;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Thalyson',
    email: 'thalyson@example.com',
    avatar: 'https://example.com/photo.jpg'
  })

	return (
		<AuthContext.Provider value={{
      user
		}}>
			{children}
		</AuthContext.Provider>
	);
}