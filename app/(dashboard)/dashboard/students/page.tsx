import { auth } from "@/auth";

export default async function Students() {
  const session = await auth();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Students</h1>
    </section>
  );
}
