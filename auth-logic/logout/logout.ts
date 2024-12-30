import { cookies } from "next/headers";
import { redirect } from "next/navigation";
function logout() {
    cookies().delete("jwt")
    redirect("/");
}

export default logout
