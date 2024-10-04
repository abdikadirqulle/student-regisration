import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/sign-in");
  } else {
    return redirect("/dashboard");
  }
}
