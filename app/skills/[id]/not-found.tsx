import Link from "next/link";

// app/skills/[identifier]/not-found.tsx
export default function NotFound() {
  return <section className="p-4 flex flex-col gap-4 max-w-md mx-auto my-8 text-center border rounded-lg shadow-md">
    <h1>404 - Page Not Found</h1>
    <Link href="/" className="btn btn-primary mt-4">Back to Home</Link>
</section >
}