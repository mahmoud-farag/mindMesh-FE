import axiosClient from '../utils/axiosClient';


const DOCUMENTS_PATHS = {
  UPLOAD: '/api/documents/upload-pdf',
  GET_DOCUMENTS: '/api/documents',
  GET_DOCUMENT_BY_ID: (id) => `/api/documents/${id}`,
  UPDATE_DOCUMENT: (id) => `/api/documents/${id}`,
  DELETE_DOCUMENT: (id) => `/api/documents/${id}`,
};


const documentService = {};


documentService.uploadDocument = async (params = {}, options = {}) => {
  try {

    const { formData } = params;

    // Send formData directly - NOT wrapped in an object
    // axios will automatically set the correct Content-Type boundary for multipart/form-data
    const response = await axiosClient.post(DOCUMENTS_PATHS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    });

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while uploading new pdf file' };
  }
};

documentService.getAllDocuments = async (params = {}, options = {}) => {
  try {
    const { offset, limit } = params;

    const response = await axiosClient.get(DOCUMENTS_PATHS.GET_DOCUMENTS, { params: { offset, limit } });

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while fetching documents' };
  }
};

documentService.getDocument = async (params = {}, options = {}) => {
  try {
    const { documentId } = params;

    const response = await axiosClient.get(DOCUMENTS_PATHS.GET_DOCUMENT_BY_ID(documentId));

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while get the document' };
  }
};

documentService.updateDocument = async (params = {}, options = {}) => {
  try {

    const { documentId } = params;

    const response = await axiosClient.put(DOCUMENTS_PATHS.UPDATE_DOCUMENT(documentId));

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while updating the document' };
  }
};

documentService.deleteDocument = async (params = {}, options = {}) => {
  try {

    const { documentId } = params;

    const response = await axiosClient.delete(DOCUMENTS_PATHS.DELETE_DOCUMENT(documentId));

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while deleting the document' };
  }
};

export default documentService;
