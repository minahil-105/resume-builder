"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PreviewPage() {
  const searchParams = useSearchParams(); // This causes the error
  const paramValue = searchParams.get("someParam");

  return (
    <div>
      <h1>Preview Page</h1>
      <p>Query Param: {paramValue}</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewPage />
    </Suspense>
  );
}
