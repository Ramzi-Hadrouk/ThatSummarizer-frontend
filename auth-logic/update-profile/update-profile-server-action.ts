"use server";

import UpdateProfileSchema from "@/auth-logic/update-profile/update-profile-schema-validation";
import type { UpdateProfileFields } from "@/utils/interfaces/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
 import axios from "axios";

export default async function updateProfileServerAction(prevState: any,formData: FormData) 

{
  const fields: UpdateProfileFields = {
   id: Number(formData.get("id")),
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    bio: formData.get("bio") as string,
  };
  console.dir(fields)
  // Data Validation
  const validationResult = UpdateProfileSchema.safeParse(fields);

  if (!validationResult.success) {
    console.error("not valid ")
    return {
      ...prevState,
      validation_errors: validationResult.error.flatten().fieldErrors,
      is_updated: { state: "no", error: null },
    };
  }

  // Get JWT token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    // Update user data via Strapi API
    const data= await axios.put(
      `${process.env.BASE_URL||"http://localhost:1337"}/api/users/${fields.id}`,
      fields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

   console.dirxml("data of response : "+data)

    return {
      ...prevState,
      validation_errors: null,
      is_updated: { state: "yes", error: null },
    };
  } catch (error: any) {
   console.dir("error!=>=> "+JSON.stringify(error, null, 2))
     
    return {
      ...prevState,
      validation_errors: null,
      is_updated: { state: "no", error: error },
    };
  } 
}