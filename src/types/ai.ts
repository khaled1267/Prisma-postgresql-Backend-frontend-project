import { Product } from "./product";

export type MessageSender = "user" | "assistant";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  recommendedProducts?: Product[];
  isError?: boolean;
}

export interface SendChatMessageDTO {
  message: string;
}

export interface AiChatResponse {
  reply: string;
  recommendedProducts?: Product[];
}
