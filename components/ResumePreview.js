"use client";

export default function ResumePreview({ resumeData }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
      {/* Name Section */}
      <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
      <p className="text-gray-400 mb-4">{resumeData.email}</p>

      {/* Experience Section */}
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Experience
      </h2>
      <div className="mb-6">
        {resumeData.experience
          .split("\n") // Split experience into bullet points
          .map((line, index) => (
            <p key={index} className="text-gray-300 mb-2">
              {line.trim()}
            </p>
          ))}
      </div>

      {/* Skills Section */}
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {resumeData.skills
          .split(",") // Split skills into individual items
          .map((skill, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
            >
              {skill.trim()}
            </span>
          ))}
      </div>
    </div>
  );
}