import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';
import { storageAuthTokenSave } from '@storage/storageAuthToken';

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

  async function storageUserAndToken(userData:UserDTO, token:string) {
    try {
      setIsLoadingUserStorageData(true)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await storageUserSave(userData)
      await storageAuthTokenSave(token)
      setUser(userData)

    } catch (error) {
      throw error
    }
    finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndToken(data.user, data.token)
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