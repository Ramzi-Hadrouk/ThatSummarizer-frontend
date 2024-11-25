"use server";
 

export default async function registerUserAction(formData: FormData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
  
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  
    // Add user registration logic here
    return { success: true };
  }