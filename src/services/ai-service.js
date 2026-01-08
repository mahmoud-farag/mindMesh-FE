import axiosClient from '../utils/axiosClient';


const  AI_PATHS = {
  GENERATE_FLASHCARDS: '/api/ai/generate-flashcards',
  GENERATE_QUIZ: '/api/ai/generate-quiz',
  GENERATE_SUMMARY: '/api/ai/generate-summary',
  CHAT: '/api/ai/chat',
  EXPLAIN_CONCEPT: '/api/ai/explain-concept',
  GET_CHAT_HISTORY: (documentId) =>
    `/api/ai/chat-history/${documentId}`,
}


const aiService = {};


aiService.generateFlashCards = async (params = {}, options = {}) => {
  try {

    const { documentId } = params;
    
    const response = await axiosClient.post(AI_PATHS.GENERATE_FLASHCARDS, { ...params });

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while generating the flashcards' };
  }
};

aiService.generateQuiz = async (params = {}, options = {}) => {
  try {
    const { documentId } = params;
    
    const response = await axiosClient.post(AI_PATHS.GENERATE_QUIZ, { ...params });

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while generating the quiz' };
  }
};

aiService.generateSummary = async (params = {}, options = {}) => {
  try {
    const { documentId } = params;
    
    const response = await axiosClient.post(AI_PATHS.GENERATE_SUMMARY, { ...params });

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while generating the summary' };
  }
};


aiService.chat = async (params = {}, options = {}) => {
  try {

    const { documentId , message } = params;
    
    const response = await axiosClient.post(AI_PATHS.CHAT, { ...params });

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while chatting' };
  }
};

aiService.getChatHistory = async (params = {}, options = {}) => {
  try {

    const { documentId, limit, offset  } = params;
    
    const response = await axiosClient.get(AI_PATHS.GET_CHAT_HISTORY(documentId), { params: { limit, offset } });

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while getting chat history' };
  }
};

export default aiService;
