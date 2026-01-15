import axiosClient from '../utils/axiosClient';




const QUIZZES_PATHS = {
  GET_QUIZZES_FOR_DOC: (documentId) => `/api/quiz/${documentId}`,
  GET_QUIZ_BY_ID: (id) => `/api/quiz/get-quiz/${id}`,
  SUBMIT_QUIZ: (id) => `/api/quiz/${id}/submit`,
  GET_QUIZ_RESULTS: (id) => `/api/quiz/${id}/results`,
  DELETE_QUIZ: (id) => `/api/quiz/${id}`,
};

const quizService = {};

quizService.getQuizzesForDocument = async (params = {}) => {
  try {
    const { documentId, offset, limit } = params;

    const response = await axiosClient.get(
      QUIZZES_PATHS.GET_QUIZZES_FOR_DOC(documentId),
      { params: { offset, limit } }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data ?? {
        message: 'Error while getting document quizzes',
      }
    );
  }
};

quizService.getQuizById = async (params = {}, options = {}) => {
  try {
    const { quizId } = params;

    const response = await axiosClient.get(
      QUIZZES_PATHS.GET_QUIZ_BY_ID(quizId)
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data ?? { message: 'Error while fetching quiz details' }
    );
  }
};

quizService.getQuizResults = async (params = {}, options = {}) => {
  try {
    const { quizId } = params;

    const response = await axiosClient.get(
      QUIZZES_PATHS.GET_QUIZ_RESULTS(quizId)
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data ?? { message: 'Error while fetching quiz results' }
    );
  }
};

quizService.deleteQuiz = async (params = {}, options = {}) => {
  try {
    const { quizId } = params;

    const response = await axiosClient.delete(
      QUIZZES_PATHS.DELETE_QUIZ(quizId)
    );

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Error while deleting the quiz' };
  }
};

quizService.submitQuiz = async (params = {}, options = {}) => {
  try {
    const { answers, quizId } = params;

    const response = await axiosClient.post(QUIZZES_PATHS.SUBMIT_QUIZ(quizId), {
      answers,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data ?? {
        message: 'Error while submitting the quiz answers',
      }
    );
  }
};

export default quizService;