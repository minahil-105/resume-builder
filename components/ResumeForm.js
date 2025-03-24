"use client";
import { useState } from "react";

export default function ResumeForm({ resumeData, setResumeData }) {
  const [suggestions, setSuggestions] = useState([]); // State to store AI-generated suggestions
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  // Function to handle generating suggestions
  const handleGenerateSuggestions = async () => {
    if (!resumeData.experience.trim()) {
      alert("Please enter some experience details first.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      // Call the OpenAI API endpoint
      const response = await fetch("/api/generateSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: resumeData.experience }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate suggestions.");
      }

      const data = await response.json();
      setSuggestions(data.summary); // Set the generated suggestions
    } catch (error) {
      console.error("Error generating suggestions:", error);
      alert("An error occurred while generating suggestions. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Function to apply a suggestion to the experience field
  const handleApplySuggestion = (suggestion) => {
    setResumeData({ ...resumeData, experience: suggestion });
    setSuggestions([]); // Clear suggestions after applying
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Enter Resume Details</h2>
      <div className="space-y-4">
        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={resumeData.name}
          onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
          placeholder="Full Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={resumeData.email}
          onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Experience Textarea */}
        <textarea
          name="experience"
          value={resumeData.experience}
          onChange={(e) => setResumeData({ ...resumeData, experience: e.target.value })}
          placeholder="Experience (one per line)"
          className="w-full p-2 rounded bg-gray-700 text-white"
          rows={5}
        />

        {/* Generate Suggestions Button */}
        <button
          onClick={handleGenerateSuggestions}
          disabled={isLoading} // Disable button while loading
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
        >
          {isLoading ? "Generating..." : "Generate Suggestions"}
        </button>

        {/* Display AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                  <span className="text-gray-300">{suggestion}</span>
                  <button
                    onClick={() => handleApplySuggestion(suggestion)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}