/*import qs from "qs";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL || "http://localhost:1337";
  }

  // Generates a query string from an object
  private generateQuery(queryObj: object): string {
    return qs.stringify(queryObj);
  }

  private isQueryObjectValide(queryObj: object = {}): boolean {
    return Object.keys(queryObj).length > 0;
  }


  // Fetch data from the API, optionally using caching
  private async fetchData(url: URL, useCache: boolean): Promise<Response> {

    const response = await fetch(url.href, {
      cache: useCache ? 'default' : 'no-store',
    });

    return response;

  }


  // if the queryObj is currect return the complete url else return baseUrl
  private generateURL(path: string, queryObj: object = {}) {
     const url = new URL(path, this.baseUrl);

    if (this.isQueryObjectValide(queryObj)) {
      url.search = this.generateQuery(queryObj);
    }

    return url
  }



  async getData(path: string, queryObj: object = {}, cache: boolean = true) {

    const url = this.generateURL(path, queryObj);


    try {
      console.log('Fetching data from:', url.href)

      const response = await this.fetchData(url, cache);


      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.dir('Fetched data: ', data)
      return data;

    } catch (error) {
      console.error(`Error fetching data from ${url.href}:`, error);
      throw error;
    }
  }
}

export default ApiService;
*/


import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

class ApiService {
  private baseUrl: string | undefined;
  private token?: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL ;
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

  async getData(path: string, queryObj: Record<string, any> = {}, cache: boolean = false, withToken: boolean = false): Promise<any> {
    const url = this.generateURL(path, queryObj);

    try {
      console.log('Fetching data from:', url);
      return await this.fetchData(url, cache, withToken ? this.token : undefined);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }
}

export default ApiService;
