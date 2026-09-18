// app/some-page/error.tsx
"use client";

export default function Error({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <div className="text-center py-16">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={retry} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}