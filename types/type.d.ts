import { ChatCompletionMessageParam } from 'openai/resources/chat';

export type ChatFaceElement = {
  id?: number;
  name?: string;
  image?: any;
  primary?: string;
  secondary?: string;
};

export type aiMessageProps = {
  modelName?: string;
  systemMessage?: string;
  userMessage?: string;
};

export type ChatFaceType = ChatFaceElement[];
