import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="mt-4">This is your dashboard.</p>
    </div>
  );
}
