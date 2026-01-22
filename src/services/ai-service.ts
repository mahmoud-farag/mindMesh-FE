import { AxiosError, isAxiosError } from 'axios';
import axiosClient from '../utils/axiosClient';
import { IResponse } from './interfaces';

const AI_PATHS = {
  GENERATE_FLASHCARDS: '/api/ai/generate-flashcards',
  GENERATE_QUIZ: '/api/ai/generate-quiz',
  GENERATE_SUMMARY: '/api/ai/generate-summary',
  CHAT: '/api/ai/chat',
  EXPLAIN_CONCEPT: '/api/ai/explain-concept',
  GET_CHAT_HISTORY: (documentId: string) =>
    `/api/ai/chat-history/${documentId}`,
};

interface GenerateParams {
  documentId: string;
}

interface ChatParams {
  documentId: string;
  question: string;
}

interface HistoryParams {
  documentId: string;
  limit?: number;
  offset?: number;
}

interface ExplainParams {
  documentId: string;
  concept: string;
}




interface AIService {
  generateFlashCards: (params: GenerateParams) => Promise<IResponse<{ flashcards: any }>>;
  generateQuiz: (params: GenerateParams) => Promise<IResponse<{ quiz: any }>>;
  generateSummary: (
    params: GenerateParams
  ) => Promise<IResponse<{ summary: string }>>;
  chat: (params: ChatParams) => Promise<IResponse<{ question: any; answer: any }>>;
  getChatHistory: (params: HistoryParams) => Promise<any[]>; // Chat history returns an array directly based on usage
  explainConcept: (params: ExplainParams) => Promise<IResponse<{ answer: string }>>;
};

class AIServiceImpl implements AIService {
  private client = axiosClient;

  /**
   * Centralized error handling for AI service methods
   */
  private handleError(error: unknown, defaultMessage: string): never {
    if (isAxiosError(error)) {
      throw error.response?.data ?? { message: defaultMessage };
    }
    throw new Error(defaultMessage);
  }

  async generateFlashCards(params: GenerateParams): Promise<IResponse<{ flashcards: any }>> {
    try {
      const response = await this.client.post(AI_PATHS.GENERATE_FLASHCARDS, {
        ...params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while generating the flashcards');
    }
  }

  async generateQuiz(params: GenerateParams): Promise<IResponse<{ quiz: any }>> {
    try {
      const response = await this.client.post(AI_PATHS.GENERATE_QUIZ, {
        ...params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while generating the quiz');
    }
  }

  async generateSummary(
    params: GenerateParams
  ): Promise<IResponse<{ summary: string }>> {
    try {
      const response = await this.client.post(AI_PATHS.GENERATE_SUMMARY, {
        ...params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while generating the summary');
    }
  }

  async chat(params: ChatParams): Promise<IResponse<{ question: any; answer: any }>> {
    try {
      const response = await this.client.post(AI_PATHS.CHAT, { ...params });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while chatting');
    }
  }

  async getChatHistory(params: HistoryParams): Promise<any[]> {
    try {
      const { documentId, limit, offset } = params;
      const response = await this.client.get(
        AI_PATHS.GET_CHAT_HISTORY(documentId),
        { params: { limit, offset } }
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while getting chat history');
    }
  }

  async explainConcept(params: ExplainParams): Promise<IResponse<{ answer: string }>> {
    try {
      const { documentId, concept } = params;
      const response = await this.client.post(AI_PATHS.EXPLAIN_CONCEPT, {
        documentId,
        concept,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error while explaining concept');
    }
  }
}

export default new AIServiceImpl();
