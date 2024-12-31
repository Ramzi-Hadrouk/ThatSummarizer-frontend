"use server";

import AuthService from "../api-auth-service-class";
import loginSchema from "@/auth-logic/login/login-schema-validation";
import type { LoginFields } from "@/utils/interfaces/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cookieConfig from "@/utils/objects/jwt-cookie-config";


// Main function to register the user
export default async function loginServerAction(prevState: any, formData: FormData) {
  
  const fields: LoginFields = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //==========================DATA Validation =====
  const validationResult = loginSchema.safeParse(fields);

  if (!validationResult.success) {
    return{
      ...prevState,
      validation_errors: validationResult.error.flatten().fieldErrors,
      is_logged: { state: "no", error: null },
    };
  }
  //==========================DATA Registration =====
  const auth = new AuthService();
  const logged = await auth.PostloginData(fields);

  if (logged.state === "no") {
    return {
      ...prevState,
      validation_errors: null,
      is_logged: logged,
    };
  }

  //==========================COOKIES Manipulation=====
  const token = auth.getToken() || "";
  cookies().set("jwt", token, cookieConfig);

  
   
  
  redirect("/dashboard");
}
