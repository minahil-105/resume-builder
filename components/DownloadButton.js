"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const html2pdfPromise = import("html2pdf.js");

export default function DownloadButton({ resumeData }) {
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    html2pdfPromise.then((module) => setHtml2pdf(module.default));
  }, []);

  const handleDownload = () => {
    if (!html2pdf) return; 

    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: 'Times New Roman', serif; padding: 20px; color: #000; background-color: #fff;">
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; color: #000;">
          ${resumeData.name}
        </h1>
        <p style="font-size: 14px; text-align: center; margin-bottom: 20px; color: #000;">
          <strong>Email:</strong> ${resumeData.email}
        </p>
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #000;">Experience</h2>
        <ul style="font-size: 14px; margin-left: 20px; list-style-type: disc; color: #000;">
          ${resumeData.experience
            .split("\n")
            .map((line) => `<li style="margin-bottom: 8px; color: #000;">${line.trim()}</li>`)
            .join("")}
        </ul>
        <h2 style="font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000;">Skills</h2>
        <ul style="font-size: 14px; margin-left: 20px; list-style-type: disc; color: #000;">
          ${resumeData.skills
            .split(",")
            .map((skill) => `<li style="margin-bottom: 8px; color: #000;">${skill.trim()}</li>`)
            .join("")}
        </ul>
      </div>
    `;

    html2pdf()
      .set({
        margin: [20, 20, 20, 20],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Download PDF
    </button>
  );
}
