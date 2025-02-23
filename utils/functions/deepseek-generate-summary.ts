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
      apiKey:process.env.DEEPSEEK_API_KEY! ,
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