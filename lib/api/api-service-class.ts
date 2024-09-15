import qs from "qs";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL || "http://localhost:1337";
  }

  // Generates a query string from an object
  private generateQuery(queryObj: object): string {
    return qs.stringify(queryObj);
  }

  // Fetch data from the API, optionally using caching
  async getData(path: string, queryObj: object = {}, cache: boolean = true) {
    
    const url = new URL(path, this.baseUrl);

    if (Object.keys(queryObj).length > 0) {
      url.search = this.generateQuery(queryObj);
    }

    try {
      console.log('Fetching data from:', url.href)
      const response = cache
        ? await fetch(url.href)
        : await fetch(url.href, { cache: 'no-store' });
      
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.dir( 'Fetched data: ' , data)
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url.href}:`, error);
      throw error;
    }
  }
}

export default ApiService;
