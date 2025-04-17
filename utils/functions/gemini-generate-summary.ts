'use server '

import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai"; // Import the main library and types
 import { cleanJsonCodeBlock } from "./cleanJsonCodeBlock";
// Ensure the API key is loaded from environment variables for security
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set."); // Crucial for authentication
}

// Initialize the Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Configuration ---
const modelName = 'gemini-2.0-flash-lite'; // Specify the Gemini model to use

// Define settings for content generation
const generationConfig: GenerationConfig = {
  temperature: 1,
  responseMimeType: 'text/plain', // Expecting plain text containing the JSON string
};

// Get an instance of the specified generative model
const model = genAI.getGenerativeModel({
    model: modelName,
    // System instructions (persona, general rules) can be set here if needed
});


/**
 * Generates a JSON summary from YouTube transcript text using the Gemini API.
 * @param transcriptText - The input transcript string.
 * @returns A promise resolving to a string (expected to be JSON).
 * @throws {Error} If API call fails or API key is missing.
 */
export async function geminiGenerateSummary(transcriptText: string): Promise<string> {

  // Construct the detailed prompt for the AI model
  const prompt = `Summarize the following YouTube video transcript. Return a JSON object in this format:

{
"title": "string",
"description": "string",
"summary": " string (of valid HTML)",
"category": "string"
}

The summary should use Markdown formatting, including bullet points, headings, or emphasis when useful. Do not include any explanation, only the JSON object.

Transcript:
${transcriptText}`; // Insert the provided transcript into the prompt

  try {
    // Call the Gemini API to generate content based on the prompt and config
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }], // Define the user's input
      generationConfig, // Apply the generation settings (temperature, mimeType)
    });

    // Extract the text content from the API's response
    let responseText = result.response.text();
      responseText  =cleanJsonCodeBlock(responseText)
    // Simple check if the response looks like a JSON object
    
    if (responseText.trim().startsWith('{') && responseText.trim().endsWith('}')) {
        return responseText; // Return the string if it seems like JSON
    } else {
        // Warn if the response doesn't strictly look like JSON, but return it anyway
        console.warn("Gemini response did not strictly start/end with JSON braces. Returning raw response anyway:", responseText);
        return responseText;
    }

  } catch (error) {
    // Handle potential errors during the API call
    console.error("Error calling Gemini API:", error);
    // Rethrow a more specific error for the caller
    throw new Error(`Gemini API call failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
