"use server";
import AuthService from "@/utils/classes/api-auth-service-class";
import signUpSchema from "@/utils/objects/sign-up-validation";
import type { SignUpFields } from "@/utils/interfaces/types"

export default async function registerUserAction(prevState: any, formData: FormData) {

  const fields: SignUpFields = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  
  
  const validationResult = signUpSchema.safeParse(fields);



  if (!validationResult.success) {
    return {
      ...prevState,
      data: fields,
      validation_errors: validationResult.error.flatten().fieldErrors,
      is_registered:{state:"no" , error :null}

    }

  }

 
   const auth=new AuthService() ;
  const state =await auth.signup(fields) ;
 
   return {
    ...prevState,
    data: {
      username: formData.get("username"),
      email: formData.get("email"),
    },
    validation_errors: null,
    is_registered:state
  };

}