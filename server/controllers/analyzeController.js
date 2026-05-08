const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const AnalysisHistory = require('../models/AnalysisHistory');

// Initialize Gemini conditionally
let genAI;
let model;
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }
} catch (e) {
  console.warn("Gemini API key missing or invalid. Analysis will fail if called.");
}

exports.analyzeResume = async (req, res) => {
  try {
    const { manualSkills, jobRole } = req.body;
    let resumeText = '';

    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
    } else if (manualSkills) {
      resumeText = manualSkills;
    } else {
      return res.status(400).json({ message: 'Please provide a resume PDF or manual skills.' });
    }

    if (!jobRole) {
      return res.status(400).json({ message: 'Please select a job role.' });
    }

    if (!genAI || !model) {
      return res.status(500).json({ message: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your .env file.' });
    }

    const prompt = `
      You are a senior career coach and technical interviewer.
      Analyze this candidate's resume/skills text and compare it with the role of "${jobRole}".
      
      Resume/Skills Text:
      ${resumeText}

      Return a JSON response with exactly this structure, nothing else:
      {
        "extractedSkills": ["skill1", "skill2"],
        "missingSkills": ["missing1", "missing2"],
        "gapPercentage": 45,
        "roadmap": ["Week 1: Learn X", "Week 2: Practice Y"],
        "projects": ["Build a project doing Z", "Create an app for W"]
      }
    `;

    // Enforce JSON output in Gemini
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });

    const responseText = result.response.text();
    const aiResult = JSON.parse(responseText);

    // Save to database
    const newHistory = new AnalysisHistory({
      user: req.user, // req.user is set by authMiddleware (userId)
      jobRole,
      extractedSkills: aiResult.extractedSkills || [],
      missingSkills: aiResult.missingSkills || [],
      gapPercentage: aiResult.gapPercentage || 0,
      roadmap: aiResult.roadmap || [],
      projects: aiResult.projects || []
    });

    await newHistory.save();

    res.json(newHistory);

  } catch (error) {
    console.error('Error in analyzeResume:', error);
    res.status(500).json({ message: 'Error analyzing resume', error: error.message });
  }
};
