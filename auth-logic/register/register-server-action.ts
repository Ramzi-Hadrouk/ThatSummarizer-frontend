"use server";

import AuthService from "../api-auth-service-class";
import signUpSchema from "@/auth-logic/register/register-schema-validation";
import type { SignUpFields } from "@/utils/interfaces/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cookieConfig from "@/utils/objects/jwt-cookie-config";


// Main function to register the user
export default async function registerServerAction(prevState: any, formData: FormData) {
  
  const fields: SignUpFields = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //==========================DATA Validation =====
  const validationResult = signUpSchema.safeParse(fields);

  if (!validationResult.success) {
    return{
      ...prevState,
      validation_errors: validationResult.error.flatten().fieldErrors,
      is_registered: { state: "no", error: null },
    };
  }
  //==========================DATA Registration =====
  const auth = new AuthService();
  const Registered = await auth.postRegisterData(fields);

  if (Registered.state === "no") {
    return {
      ...prevState,
      validation_errors: null,
      is_registered: Registered,
    };
  }

  //==========================COOKIES Manipulation=====
  const token = auth.getToken() || "";
  cookies().set("jwt", token, cookieConfig);

  redirect("/dashboard");
}
