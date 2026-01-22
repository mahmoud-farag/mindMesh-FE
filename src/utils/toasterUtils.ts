
import toast, { ToastOptions } from 'react-hot-toast';
import { IToastService } from '../services/interfaces';



class ToastService implements IToastService {

  success(message: string, options?: ToastOptions) {
    toast(message, {
      style: {
        background: '#22C55E',
        color: '#FFFFFF',
      },
      ...options,
    });
  };


  error(message: string, options?: ToastOptions) {
    toast(message, {
      style: {
        background: '#EF4444',
        color: '#FFFFFF',
      },
      ...options,
    });
  };


  warning(message: string, options?: ToastOptions) {
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#FFFFFF',
      },
      ...options,
    });
  }

}

export default new ToastService();
