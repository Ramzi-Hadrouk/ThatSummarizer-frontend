'use server '
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Updated to current model name
  systemInstruction: `For the given text, complete the following tasks: 
  1. Generate a Title: Create a compelling and relevant title based on the content.  
  1. Generate a introduction: Create a compelling and relevant introduction based on the content.  
  2. Summarize the Content: Write a first-person summary in a natural tone, highlighting five key topics.  
  3. Write a YouTube Video Description:
    - Structure it with headings and sections.  
    - Include relevant keywords and key takeaways.  
  4. Generate a Bullet List: Outline key points and benefits concisely.  
  5. Suggest Optimal Keywords: Provide a list of the best recommended keywords for visibility and engagement. 
  
  important note : dont let empty lines between titles and contents 
  `
  
,
});

const generationConfig = {
  temperature: 0.7, // Adjusted to safer value
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