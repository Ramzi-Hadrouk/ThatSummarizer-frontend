"use server";

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
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Filed To Register',

    }

  }

  return {
    ...prevState,
    data: {
      username: formData.get("username"),
      email: formData.get("email"),
    },
    errors: null,
    message: 'Successfully Registered',

  };

}