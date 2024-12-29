import axios from "axios";
async function   isAuthenticated(jwt: string | undefined) {
    const baseUrl= process.env.BASE_URL||"http://localhost:1337"
    const url=`${baseUrl}/api/users/me`
    console.log('URL:', url);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
       return { isValid: true, data: response.data, error: null };
    } catch (error: any) {

      // في حالة وجود خطأ في الاستجابة (مثل 4xx أو 5xx)
      if (error.response) {
        return {isValid: false, data: null, error: error.response.data || error.message }
      }
  
      // في حالة وجود خطأ في الشبكة أو مشكلة أخرى
      return { isValid: false, data: null, error: error.message };
    }
    
  }
export default isAuthenticated
