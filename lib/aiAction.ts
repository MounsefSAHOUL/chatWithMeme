import OpenAI from 'openai';

import { aiMessageProps } from '~/types/type';

export const callChat = async ({ modelName, systemMessage, userMessage }: aiMessageProps) => {
  try {
    const openrouterClient = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: 'APIKey From openRouter',
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
        'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
      },
    });

    const completion = await openrouterClient.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
    });
    return completion;
  } catch (error) {
    console.error(error);
  }
};
