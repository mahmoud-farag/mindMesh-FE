import axiosClient from '../utils/axiosClient';



const FLASHCARDS_PATHS = {
  GET_ALL_FLASHCARD_SETS: '/api/flashcards',
  GET_FLASHCARDS_FOR_DOC: (documentId) => `/api/flashcards/${documentId}`,
  REVIEW_FLASHCARD: (cardId) => `/api/flashcards/${cardId}/review`,
  TOGGLE_STAR: (cardId) => `/api/flashcards/${cardId}/star`,
  DELETE_FLASHCARD_SET: (id) => `/api/flashcards/${id}`,
};


const flashCardsService = {};



flashCardsService.getAllFlashcardSets = async (params = {} ) => {
  try {

    const { offset, limit } = params;
    
    const response = await axiosClient.get(FLASHCARDS_PATHS.GET_ALL_FLASHCARD_SETS, { params: { offset, limit }});

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while getting all flashcards' };
  }
};

flashCardsService.getFlashcardForDocument = async (params = {}, options = {}) => {
  try {
    const { documentId } = params;
    
    const response = await axiosClient.get(FLASHCARDS_PATHS.GET_FLASHCARDS_FOR_DOC(documentId));

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while fetching document flashcards' };
  }
};

flashCardsService.reviewFlashCard = async (params = {}, options = {}) => {
  try {
    const { cardId } = params;
    
    const response = await axiosClient.post(FLASHCARDS_PATHS.GET_FLASHCARDS_FOR_DOC(cardId));

    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while reviewing the flashcard' };
  }
};

flashCardsService.deleteFlashCardSet = async (params = {}, options = {}) => {
  try {
    const { flashCardSetId } = params;
    
    const response = await axiosClient.delete(FLASHCARDS_PATHS.DELETE_FLASHCARD_SET(flashCardSetId));
    
    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while deleting flashcard set' };
  }
};

flashCardsService.toggleFlashCard = async (params = {}, options = {}) => {
  try {
    const { cardId } = params;
    
    const response = await axiosClient.put(FLASHCARDS_PATHS.TOGGLE_STAR(cardId));
    
    return response.data;

  } catch(error) {

    throw error.response?.data ?? { message: 'Error while toggling the flashcard' };
  }
};


export default flashCardsService;