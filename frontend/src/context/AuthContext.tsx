import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../serviceClients/user/user.serviceClient";
import { UserAuthentication } from "../interfaces/userService/userAuthentication";
import { jwtDecode } from "jwt-decode";
import { UserCreateDTO } from "../interfaces/userService/user/createDTO";
import { UserLoginDTO } from "../interfaces/userService/login";

type JWToken = {
  exp: number;
  iat: number;
  user_id: string;
}

interface AuthContextType {
  currentUser: UserAuthentication | null;
  login: (input: UserLoginDTO) => Promise<boolean | void>;
  register: (input: UserCreateDTO) => Promise<boolean | void>;
  logout: () => void;
  loginError: string;
  registerError: string;
}

  const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {},
    loginError: "",
    registerError: "",
  });

  export function useAuth() {
    return useContext(AuthContext);
  }

  export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [currentUser, setCurrentUser] = useState<UserAuthentication | null>(null);
    const [loginError, setLoginError] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");

    const login = useCallback(async (input: UserLoginDTO) => {
      const response = await loginUser(input);
      setLoginError("")
      if (response.success && response.data) {
        // login success
        setCurrentUser(response.data);
        // save to cookies
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      } else {
        setLoginError(response.errors.join());
        return false;
      }
    }, [])

    const register = useCallback(async (input: UserCreateDTO) => {
      const response = await registerUser(input);
      setRegisterError("");
      if (response.success) {
        return true;
      } else {
        setRegisterError(response.errors.join());
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
        loginError,
        registerError,
      }), 
      [
        currentUser,
        login,
        register,
        logout,
        loginError,
        registerError,
      ]);

      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
  }

