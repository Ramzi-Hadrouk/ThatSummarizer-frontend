"use server";

import AuthService from "@/utils/classes/api-auth-service-class";
import signUpSchema from "@/auth-logic/login/login-validation";
import type { LoginFields } from "@/utils/interfaces/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cookieConfig from "@/utils/objects/jwt-cookie-config";
import handleValidationErrors from "@/utils/functions/handle-validation-errors";
import handleFailedRegistration from "@/utils/functions/handle-failed-registration";

// Main function to register the user
export default async function registerUserAction(prevState: any, formData: FormData) {
  
  const fields: LoginFields = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validationResult = signUpSchema.safeParse(fields);

  if (!validationResult.success) {
    return handleValidationErrors(fields, validationResult, prevState);
  }

  const auth = new AuthService();
  const state = await auth.login(fields);

  if (state.state === "no") {
    return handleFailedRegistration(fields, prevState, state);
  }

  const token = auth.getToken() || "";
  cookies().set("jwt", token, cookieConfig);

  redirect("/dashboard");
}
