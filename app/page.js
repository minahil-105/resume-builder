"use client";
import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useRouter } from "next/navigation";

export default function Home() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const router = useRouter();

  const handleGenerate = () => {
    // Encode query parameters
    const queryParams = new URLSearchParams({
      name: resumeData.name,
      email: resumeData.email,
      experience: resumeData.experience,
      skills: resumeData.skills,
    }).toString();

    // Navigate to the preview page with query parameters
    router.push(`/preview?${queryParams}`);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center">AI-Powered Resume Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <ResumePreview resumeData={resumeData} />
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Generate Resume
        </button>
      </div>
    </div>
  );
}