
import axiosClient from '../utils/axiosClient';

const authService = {};


const AUTH_PATHS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  GET_PROFILE: '/api/auth/get-profile',
  UPDATE_PROFILE: '/api/auth/profile',
  CHANGE_PASSWORD: '/api/auth/change-password',
};

authService.login = async (params = {}, options = {}) => {
  try {
    // const { email, password } = params;

    // const data = { email, password, };

    const result = await axiosClient.post(AUTH_PATHS.LOGIN, params);

    return result.data;

  } catch(error) {

    throw  error.response?.data ?? { message: 'Unknown Error occurred'};
  }
};

authService.register = async (params = {}, options = {}) => {
  try {
    // const { email, password, username } = params;

    // const data = { email, password, username };

    const result = await axiosClient.post(AUTH_PATHS.REGISTER, params);

    return result.data;

  } catch(error) {

    throw  error.response?.data ?? { message: 'Unknown Error occurred'};
  }
};

authService.getUserProfile = async () => {
  try {

    const result = await axiosClient.get(AUTH_PATHS.GET_PROFILE);

    return result.data;

  } catch(error) {

    throw  error.response?.data ?? { message: 'Unknown Error occurred'};
  }
};

authService.updateUserProfile = async (params = {}, options = {}) => {
  try {
    
    const result = await axiosClient.put(AUTH_PATHS.UPDATE_PROFILE, params);

    return result.data;

  } catch(error) {

    throw  error.response?.data ?? { message: 'Unknown Error occurred'};
  }
};


authService.changePassword = async (params = {}, options = {}) => {
  try {
    
    const result = await axiosClient.patch(AUTH_PATHS.CHANGE_PASSWORD, params);

    return result.data;

  } catch(error) {

    throw  error.response?.data ?? { message: 'Unknown Error occurred'};
  }
};



export default authService;

