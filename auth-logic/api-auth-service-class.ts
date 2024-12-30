
import axios from "axios";
import type { SignUpFields,LoginFields } from "../utils/interfaces/types";

class AuthService {
  private baseUrl: string;
  private token?: string;
  private user?:object ;

  constructor() {
 
    this.baseUrl = process.env.BASE_URL||"http://localhost:1337";
    
    
  }

  //---------------- Token Fonctions
  private setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string | undefined {
    return this.token;
  }
    //---------------- User Fonctions
    private setUser(user: object): void {
      this.user = user;
    }
  
    public getUser(): object | undefined {
      return this.user;
    }

  //====================== Login===================
  async PostloginData(data:LoginFields):Promise<{ state: string; error: any }> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/local`, {
        identifier: data.email, // Using `email` as the identifier
        password: data.password,
      });

      const { jwt, user } = response.data;
      
      this.setToken(jwt);
      this.setUser(user)
      return { state: "yes", error: null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { state: "no", error: error.response?.data };
      } else {
        return { state: "no", error };
      }
    }
  }


  //===================== Signup=====================
  async postRegisterData(data: SignUpFields): Promise<{ state: string; error: any }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/auth/local/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      const { jwt, user } = response.data;
      this.setToken(jwt);
      this.setUser(user)
      
      return { state: "yes", error: null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
  
        return { state: "no", error: error.response?.data };
      } else {
        return { state: "no", error };
      }
    }
  }
}

export default AuthService;
