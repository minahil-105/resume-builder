// app/api/saveResume.js (Saving resume to Firebase API route)
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, experience, skills } = req.body;
      await addDoc(collection(db, "resumes"), { name, email, experience, skills });
      res.status(200).json({ message: "Resume saved successfully!" });
    } catch (error) {
      console.error("Error saving resume: ", error);
      res.status(500).json({ message: "Failed to save resume." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}