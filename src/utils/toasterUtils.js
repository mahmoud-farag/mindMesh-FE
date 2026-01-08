
import toast from 'react-hot-toast';



const toastService = {};


toastService.success = (message = '', options = {}) => {

  toast(message, {
    style: {
      background: '#22C55E',
      color: '#ffff',
    }, 
  });
};

toastService.error = (message = '', options = {}) => {7

  toast(message, {
    style: {
      background: '#991B1B',
      color: '#ffff',
    }, 
  });
  
};

toastService.warning = (message = '', options = {}) => {

  toast(message, {
    icon: '⚠️',
    style: {
      background: '#F59E0B',
      color: '#ffff',
    }, 
  });
};



export default toastService;

