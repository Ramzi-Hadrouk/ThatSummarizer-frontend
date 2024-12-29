


import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

class ApiService {
  private baseUrl: string | undefined;
  private token?: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL||"http://localhost:1337" ;
    this.token = process.env.TOKEN; // Initialize token from environment variable
  }

  private generateQuery(queryObj: Record<string, any>): string {
    return qs.stringify(queryObj);
  }

  private isQueryObjectValid(queryObj: Record<string, any> = {}): boolean {
    return Object.keys(queryObj).length > 0;
  }

  private async fetchData(url: string, useCache: boolean, token?: string): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      params: useCache ? {} : {}, // If you want to manage cache, this needs proper handling
    };

    const response = await axios.get(url, config);
    return response.data;
  }

  private generateURL(path: string, queryObj: Record<string, any> = {}): string {
    const url = new URL(path, this.baseUrl).toString();
    return this.isQueryObjectValid(queryObj) ? `${url}?${this.generateQuery(queryObj)}` : url;
  }

  // we are dealing with this function out side the class 
  public async getData(path: string, queryObj: Record<string, any> = {}, cache: boolean = false, withToken: boolean = false): Promise<any> {
   
    const url = this.generateURL(path, queryObj);

    try {
      return await this.fetchData(url, cache, withToken ? this.token : undefined);
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
