import axiosClient from '../utils/axiosClient';


const DOCUMENTS_PATHS = {
  UPLOAD: '/api/documents/upload-pdf',
  GET_DOCUMENTS: '/api/documents',
  GET_DOCUMENT_BY_ID: (id) => `/api/documents/${id}`,
  UPDATE_DOCUMENT: (id) => `/api/documents/${id}`,
  DELETE_DOCUMENT: (id) => `/api/documents/${id}`,
  INIT_UPLOAD: '/api/documents/init-upload',
  CONFIRM_UPLOAD: (id) => `/api/documents/${id}/confirm-upload`,
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
      onUploadProgress: options.onUploadProgress,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Error while uploading new pdf file' };
  }
};

documentService.initUpload = async (params = {}) => {
  try {
    const { title, fileName, fileSize, mimeType } = params;
    const response = await axiosClient.post(DOCUMENTS_PATHS.INIT_UPLOAD, {
      title,
      fileName,
      fileSize,
      mimeType,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Error initializing upload' };
  }
};

documentService.uploadToS3 = async ({ uploadUrl, file }, options = {}) => {
  try {
    // ! Use axios without the default client to avoid Auth headers interfering with S3
    const response = await axiosClient.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      transformRequest: [
        (data, headers) => {
          // Remove Authorization header for S3 request
          if (headers?.Authorization)
            delete headers.Authorization;

          if (headers?.common?.Authorization)
            delete headers.common.Authorization;

          return data;
        },
      ],
      onUploadProgress: options.onUploadProgress,
    });
    return response;
  } catch (error) {
    throw new Error(error?.message ?? 'Failed to upload file to S3');
  }
};

documentService.confirmUpload = async (documentId) => {
  try {
    const response = await axiosClient.patch(DOCUMENTS_PATHS.CONFIRM_UPLOAD(documentId));
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Error confirming upload' };
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
