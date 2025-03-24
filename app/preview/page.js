"use client";
import ResumePreview from "../../components/ResumePreview";
import DownloadButton from "../../components/DownloadButton";
import { useSearchParams } from "next/navigation";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const resumeData = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    experience: searchParams.get("experience") || "",
    skills: searchParams.get("skills") || "",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Resume Preview</h1>
      <ResumePreview resumeData={resumeData} />
      <DownloadButton resumeData={resumeData} />
    </div>
  );
}