import axiosClient from '../utils/axiosClient';


const DASHBOARD_PATHS = {
  GET_DASHBOARD: '/api/dashboard',
};


const dashboardService = {};

dashboardService.dashboardData = async () => {
  try {

    const response = await axiosClient.get(DASHBOARD_PATHS.GET_DASHBOARD);

    return response.data;

  } catch (error) {

    throw error.response?.data ?? { message: 'Error while fetching dashboard data' };
  }
};

export default dashboardService;