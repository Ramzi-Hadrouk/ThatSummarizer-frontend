/*** 
Install required packages:
yarn add @langchain/core @langchain/community 
*/

import { ChatDeepSeek } from "@langchain/deepseek";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Configuration constants
const DEFAULT_MODEL_NAME = "deepseek-chat";//deepseek-reasoner
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 4000;

const CONTENT_PROCESSING_TEMPLATE = `
INSTRUCTIONS:
For the provided content: {text}

1. Generate a compelling title based on the content
2. Create a summary with:
   - First-person narrative
   - Normal conversational tone
   - 5 key topics
3. YouTube Video Description:
   - Structured with headings and sections
   - Include relevant keywords
   - Highlight key takeaways
4. Key Points Section:
   - Bulleted list of main arguments
   - Clear benefits/values
5. Keyword Recommendations:
   - List of 8-10 optimized keywords
   - Mark 3 most recommended with stars
`;

interface ModelConfig {
  apiKey: string;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  maxRetries?: number;
}

export async function deepseepGenerateSummary(content: string) {
  try {
    const prompt = PromptTemplate.fromTemplate(CONTENT_PROCESSING_TEMPLATE);
    const outputParser = new StringOutputParser();

    const modelConfig: ModelConfig = {
      apiKey:process.env.DEEPSEEK_API_KEY! ,//process.env.DEEPSEEK_API_KEY!
      modelName: process.env.DEEPSEEK_MODEL || DEFAULT_MODEL_NAME,
      temperature: Number(process.env.DEEPSEEK_TEMPERATURE) || DEFAULT_TEMPERATURE,
      maxTokens: Number(process.env.DEEPSEEK_MAX_TOKENS) || DEFAULT_MAX_TOKENS,
    };

    validateEnvironmentVariables(modelConfig);

    const analysisModel = new ChatDeepSeek({
      temperature: modelConfig.temperature,
      maxTokens: modelConfig.maxTokens,
      modelName: modelConfig.modelName,
      apiKey: modelConfig.apiKey,
    });

    const processingChain = prompt.pipe(analysisModel).pipe(outputParser);
    return await processingChain.invoke({ text: content });

  } catch (error) {
    handleProcessingError(error);
  }
}


function validateEnvironmentVariables(config: ModelConfig) {
  if (!config.apiKey) {
    throw new Error("DeepSeek API key not found in environment variables");
  }
}

function handleProcessingError(error: unknown): never {
  if (error instanceof Error) {
    console.error("Content processing failed:", error.message);
    throw new Error(`Processing error: ${error.message}`);
  }
  console.error("Unexpected processing error:", error);
  throw new Error("Failed to generate content analysis");
}
/*
// Example usage
// generateContentAnalysis("Your content here...");
 

 /* 
Install required packages:
yarn add @langchain/core @langchain/community dotenv

Create .env file with:
DEEPSEEK_API_KEY=your_api_key_here


import { ChatDeepSeek } from "@langchain/deepseek";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Configuration constants
const DEFAULT_MODEL_NAME = "deepseek-chat";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 4000;
const DEFAULT_MAX_RETRIES = 3;
const MAX_CONTENT_LENGTH = 10000;

const CONTENT_PROCESSING_TEMPLATE = `
INSTRUCTIONS:
For the provided content: {text}

1. Generate a compelling title based on the content
2. Create a summary with:
   - First-person narrative
   - Normal conversational tone
   - 5 key topics
3. YouTube Video Description:
   - Structured with headings and sections
   - Include relevant keywords
   - Highlight key takeaways
4. Key Points Section:
   - Bulleted list of main arguments
   - Clear benefits/values
5. Keyword Recommendations:
   - List of 8-10 optimized keywords
   - Mark 3 most recommended with stars
`;

interface ModelConfig {
  apiKey: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  maxRetries: number;
}

export async function generateSummary(content: string) {
  try {
    // Validate input first
    if (!content || content.length > MAX_CONTENT_LENGTH) {
      throw new Error(`Content must be between 1-${MAX_CONTENT_LENGTH} characters`);
    }

    const prompt = PromptTemplate.fromTemplate(CONTENT_PROCESSING_TEMPLATE);
    const outputParser = new StringOutputParser();

    const modelConfig: ModelConfig = {
      apiKey: "sk-37bc1322549140a695846e66c7efbc6e",//process.env.DEEPSEEK_API_KEY!,
      modelName: process.env.DEEPSEEK_MODEL || DEFAULT_MODEL_NAME,
      temperature: Number(process.env.DEEPSEEK_TEMPERATURE) || DEFAULT_TEMPERATURE,
      maxTokens: Number(process.env.DEEPSEEK_MAX_TOKENS) || DEFAULT_MAX_TOKENS,
      maxRetries: Number(process.env.DEEPSEEK_MAX_RETRIES) || DEFAULT_MAX_RETRIES,
    };

    validateEnvironmentVariables(modelConfig);

    const analysisModel = new ChatDeepSeek({
      temperature: modelConfig.temperature,
      maxTokens: modelConfig.maxTokens,
      modelName: modelConfig.modelName,
      apiKey: modelConfig.apiKey,
      maxRetries: modelConfig.maxRetries,
    });

    const processingChain = prompt.pipe(analysisModel).pipe(outputParser);
    return await processingChain.invoke({ text: content });

  } catch (error) {
    return handleProcessingError(error);
  }
}

function validateEnvironmentVariables(config: ModelConfig) {
  if (!config.apiKey) {
    throw new Error("DeepSeek API key not found in environment variables");
  }
  
  if (config.temperature < 0 || config.temperature > 1) {
    throw new Error("Temperature must be between 0 and 1");
  }
}

function handleProcessingError(error: unknown): never {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('insufficient balance')) {
      throw new Error('API account has insufficient balance. Please add credits.');
    }
    if (message.includes('rate limit')) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (message.includes('authentication')) {
      throw new Error('Invalid API key. Please check your credentials.');
    }
    
    throw new Error(`Content processing failed: ${error.message}`);
  }
  throw new Error('Unexpected error during content processing');
}

// Example usage:
// (async () => {
//   try {
//     const result = await generateSummary("Your content here...");
//     console.log("Processing Result:\n", result);
//   } catch (error) {
//     console.error(error instanceof Error ? error.message : "Unknown error");
//   }
// })();


 
//=====================OpenAi ===========================
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Configuration constants
const DEFAULT_MODEL_NAME = "gpt-3.5-turbo";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 4000;

const CONTENT_PROCESSING_TEMPLATE = `
INSTRUCTIONS:
For the provided content: {text}

1. Generate a compelling title based on the content
2. Create a summary with:
   - First-person narrative
   - Normal conversational tone
   - 5 key topics
3. YouTube Video Description:
   - Structured with headings and sections
   - Include relevant keywords
   - Highlight key takeaways
4. Key Points Section:
   - Bulleted list of main arguments
   - Clear benefits/values
5. Keyword Recommendations:
   - List of 8-10 optimized keywords
   - Mark 3 most recommended with stars
`;

interface ModelConfig {
  apiKey: string;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  maxRetries: number;
}


//-----
export async function generateSummary(content: string) {
  try {
    const prompt = PromptTemplate.fromTemplate(CONTENT_PROCESSING_TEMPLATE);
    const outputParser = new StringOutputParser();

    const modelConfig: ModelConfig = {
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: process.env.OPENAI_MODEL || DEFAULT_MODEL_NAME,
      temperature: Number(process.env.OPENAI_TEMPERATURE) || DEFAULT_TEMPERATURE,
      maxTokens: Number(process.env.OPENAI_MAX_TOKENS) || DEFAULT_MAX_TOKENS,
      maxRetries: 3
    };

    validateEnvironmentVariables(modelConfig);

    const analysisModel = new ChatOpenAI({
      temperature: modelConfig.temperature,
      maxTokens: modelConfig.maxTokens,
      modelName: modelConfig.modelName,
      openAIApiKey: modelConfig.apiKey,
    });

    const processingChain = prompt.pipe(analysisModel).pipe(outputParser);
    return await processingChain.invoke({ text: content });

  } catch (error) {
    handleProcessingError(error);
  }
}


//---

function validateEnvironmentVariables(config: ModelConfig) {
  if (!config.apiKey) {
    throw new Error("OpenAI API key not found in environment variables");
  }
}

function handleProcessingError(error: unknown): never {
  if (error instanceof Error) {
    console.error("Content processing failed:", error.message);
    throw new Error(`Processing error: ${error.message}`);
  }
  console.error("Unexpected processing error:", error);
  throw new Error("Failed to generate content analysis");
}