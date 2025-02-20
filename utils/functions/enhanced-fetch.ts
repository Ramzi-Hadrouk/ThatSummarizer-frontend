interface FetchOptions extends RequestInit {
  timeout?: number;
}


export enum ResponseType {
  JSON = "json",
  TEXT = "text",
  BLOB = "blob",
  ARRAY_BUFFER = "arrayBuffer",
  FORM_DATA = "formData"
};


const responseHandlers = {
  [ResponseType.JSON]: (res: Response) => res.json(),
  [ResponseType.TEXT]: (res: Response) => res.text(),
  [ResponseType.BLOB]: (res: Response) => res.blob(),
  [ResponseType.ARRAY_BUFFER]: (res: Response) => res.arrayBuffer(),
  [ResponseType.FORM_DATA]: (res: Response) => res.formData()
} as const;



//-------------enhancedFetch function 

export  async function enhancedFetch<T>
  (
    url: string,
    options: FetchOptions = {} ,
    responseType: ResponseType = ResponseType.JSON,
  )
  : Promise<T> {


  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 8000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);



    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // تجاهل الأخطاء عند محاولة قراءة JSON
      }

      throw new Error(errorMessage);
    }
    let handler = responseHandlers[responseType];
    return handler(response) as Promise<T>;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}