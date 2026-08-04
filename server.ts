import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Resume & Internship Matcher
  app.post("/api/ai/match", async (req, res) => {
    try {
      const { userSkills, userBio, roleTitle, companyName, roleRequirements } = req.body;

      const ai = getGenAI();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured
        return res.json({
          score: 88,
          strengths: [
            "Strong fundamental skill alignment with core role demands",
            "Relevant background in computer science / design frameworks",
            "High learning agility demonstrated in portfolio"
          ],
          gaps: [
            "Could highlight production metrics or project impact quantification"
          ],
          tailoredTip: `Highlight any hands-on experience or project work relevant to ${companyName}'s current stack in your cover letter.`,
          isFallback: true
        });
      }

      const prompt = `You are a top tech & startup talent match advisor for InternsLoom. 
Analyze the candidate fit for this internship:
Candidate Skills: ${Array.isArray(userSkills) ? userSkills.join(", ") : userSkills || "General CS/Product/Design student"}
Candidate Bio/Summary: ${userBio || "Ambitious university student seeking high-impact internship"}
Target Role: ${roleTitle} at ${companyName}
Role Requirements: ${Array.isArray(roleRequirements) ? roleRequirements.join(", ") : roleRequirements || "Standard entry level requirements"}

Respond strictly with valid JSON with the following key structure:
{
  "score": number between 65 and 98,
  "strengths": string[],
  "gaps": string[],
  "tailoredTip": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text.trim());
      res.json(data);
    } catch (err: any) {
      console.error("AI match error:", err);
      res.status(500).json({
        error: "Failed to analyze match",
        score: 82,
        strengths: ["Solid technical fundamentals", "High adaptability"],
        gaps: ["Consider emphasizing framework-specific projects"],
        tailoredTip: "Tailor your resume bullet points with quantifiable metrics before applying.",
      });
    }
  });

  // AI Cold Email Generator
  app.post("/api/ai/cold-email", async (req, res) => {
    try {
      const { roleTitle, companyName, recruiterName, userMajor, userKeyProjects } = req.body;

      const ai = getGenAI();
      if (!ai) {
        return res.json({
          subject: `Application & Quick Query: ${roleTitle} - ${userMajor || "CS Student"}`,
          body: `Hi ${recruiterName || "Hiring Team"},\n\nI recently came across the ${roleTitle} position at ${companyName} on InternsLoom and was thoroughly impressed by your team's work.\n\nAs a ${userMajor || "Computer Science"} student, I've built projects focusing on high performance, clean UI, and modern developer tooling (${userKeyProjects || "responsive web apps"}). I would love 15 minutes to share how my background aligns with ${companyName}'s technical goals.\n\nBest regards,\n[Your Name]`
        });
      }

      const prompt = `Write a crisp, non-cringey, high-converting cold email from a student to a recruiter/engineering lead.
Role: ${roleTitle} at ${companyName}
Recruiter Name: ${recruiterName || "Hiring Team"}
Student Major: ${userMajor || "Computer Science / Design"}
Student Projects: ${userKeyProjects || "Full stack web applications with modern tech stack"}

Format as valid JSON:
{
  "subject": string,
  "body": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      res.json(JSON.parse(text.trim()));
    } catch (err) {
      console.error("AI cold email error:", err);
      res.status(500).json({ error: "Failed to generate email" });
    }
  });

  // AI Interview Prep Questions
  app.post("/api/ai/interview-prep", async (req, res) => {
    try {
      const { roleTitle, companyName } = req.body;
      const ai = getGenAI();
      if (!ai) {
        return res.json({
          questions: [
            {
              question: `Why are you interested in joining ${companyName} specifically?`,
              tip: "Connect your personal technical passions with the company's core product vision."
            },
            {
              question: `Walk us through a technical challenge you faced in a recent project and how you solved it.`,
              tip: "Use the STAR method: Situation, Task, Action, Result with clear metrics."
            },
            {
              question: `How do you handle architectural trade-offs when building under tight deadlines?`,
              tip: "Emphasize pragmatism, modularity, and iterative delivery."
            }
          ]
        });
      }

      const prompt = `Generate 3 tailored, highly relevant interview questions and pro advice for a student interviewing for ${roleTitle} at ${companyName}.
Return valid JSON:
{
  "questions": [
    { "question": string, "tip": string }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.json(JSON.parse(response.text?.trim() || "{}"));
    } catch (err) {
      console.error("Interview prep error:", err);
      res.status(500).json({ error: "Failed to generate interview prep" });
    }
  });

  // Vite Middleware for Dev vs Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InternsLoom Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
