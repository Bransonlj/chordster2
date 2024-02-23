import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/userService/userService";
import { UserAuthentication } from "../interfaces/userService/userAuthentication";
import { jwtDecode } from "jwt-decode";

type JWToken = {
  exp: number;
  iat: number;
  user_id: string;
}

interface AuthContextType {
  currentUser: UserAuthentication | null;
  login: (username: string, password: string) => Promise<boolean | void>;
  register: (username: string, email: string, password: string) => Promise<boolean | void>;
  logout: () => void;
}

  const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {},
  });

  export function useAuth() {
    return useContext(AuthContext);
  }

  export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [currentUser, setCurrentUser] = useState<UserAuthentication | null>(null);

    const login = useCallback(async (username: string, password: string) => {
      const response = await loginUser(username, password);
      console.log(response);
      if (response.success && response.data) {
        // login success
        setCurrentUser(response.data);
        // save to cookies
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      } else {
        return false;
      }
    }, [])

    const register = useCallback(async (username: string, email: string, password: string) => {
      const response = await registerUser(username, email, password);
      if (response.success) {
        return true;
      } else {
        return false;
      }
    }, [])

    const logout = useCallback(() => {
      setCurrentUser(null);
      localStorage.removeItem('user');
    }, [])

    useEffect(() => {
      const userString = (localStorage.getItem('user'));
      if (userString) {
          const user: UserAuthentication = JSON.parse(userString);
          if ((jwtDecode(user.token) as JWToken).exp * 1000 < Date.now()) {
              // jtw expired
              localStorage.removeItem('user');
              alert("login session has expired");
              logout()
          } else {
            // login from cookies
              setCurrentUser(user);
          }
      }
  }, [])


    const value = useMemo(
      () => ({
        currentUser, 
        login, 
        register, 
        logout,
      }), 
      [
        currentUser,
        login,
        register,
        logout,
      ]);

      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
  }

