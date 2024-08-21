import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        await storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    }
    finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()

      if(userLogged){
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    }
    finally {
      setIsLoadingUserStorageData(false)
    }
    
  }

  useEffect(() => {
    loadUserData()
  }, [])

	return (
		<AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserStorageData
		}}>
			{children}
		</AuthContext.Provider>
	);
}