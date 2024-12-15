/*import axios from "axios";
import type { SignUpFields } from "../interfaces/types";
class AuthService {
  private baseUrl: string | undefined;
  private token?: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL;
    this.token = process.env.TOKEN;
  }

  private setToken(token: string): void {
    this.token = token;
  }

  async login(data: { email: string; password: string }): Promise<void> {

    try {


      const response = await axios.post(`${this.baseUrl}/api/auth/local`, {
        identifier: data.email, // Using `email` as the identifier
        password: data.password,
      });

      const { jwt, user } = response.data;

      this.setToken(jwt);

      console.log("User profile:", user);
      console.log("User token:", jwt);



    } catch (error) {

      console.log("An error occurred during login:", error);


    }
  }

  async signup(data: SignUpFields) {
    try {

      const response = await axios.post(
        `${this.baseUrl}/api/auth/local/register`
        ,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      )

      const { jwt, user } = response.data;

      this.setToken(jwt);
      console.log("User profile:", user);
      console.log("User token:", jwt);
      return {state:"yes" , error :null}
    }
    catch (error) {
      console.log("An error occurred during signup:", error.message);
      return {state:"no" , error :error};

    }
  }


}


export default AuthService;*/


// src/services/AuthService.ts

import axios, { AxiosError } from "axios";
import type { SignUpFields } from "../interfaces/types";

class AuthService {
  private baseUrl: string;
  private token?: string;

  constructor() {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined in environment variables.");
    }
    this.baseUrl = process.env.BASE_URL;
    this.token = process.env.TOKEN;
  }

  private setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string | undefined {
    return this.token;
  }

  async login(data: { email: string; password: string }): Promise<void> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/local`, {
        identifier: data.email, // Using `email` as the identifier
        password: data.password,
      });

      const { jwt, user } = response.data;

      this.setToken(jwt);

      console.log("User profile:", user);
      console.log("User token:", jwt);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("An unexpected error occurred during login:", error);
      }
    }
  }

  async signup(data: SignUpFields): Promise<{ state: string; error: any }> {
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

      console.log("User profile:", user);
      console.log("User token:", jwt);

      return { state: "yes", error: null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Signup failed:",
          error.response?.data || error.message
        );
        return { state: "no", error: error.response?.data };
      } else {
        console.error("An unexpected error occurred during signup:"+ error);
        return { state: "no", error };
      }
    }
  }
}

export default AuthService;
