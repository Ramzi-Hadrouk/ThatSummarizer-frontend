'use server '
import { GoogleGenerativeAI }from "@google/generative-ai" ;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY! );

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Updated to current model name
  systemInstruction: `You are a content processing assistant. For any provided content:
1. Generate a compelling title
2. Create a first-person summary with 5 key topics
3. Create YouTube description with keywords
4. List key points with benefits
5. Provide optimized keywords
Respond in the same language as the input text.`,
});

const generationConfig = {
  temperature: 0.9, // Adjusted to safer value
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export async function geminiGenerateSummary(inputText: string) {

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: inputText }] }],
    generationConfig,
  });
  return result.response.text();
}
/*
async function example() {
  const myText = "Your input text here";
  try {
    const response = await generateResponse(myText);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

example();
*/