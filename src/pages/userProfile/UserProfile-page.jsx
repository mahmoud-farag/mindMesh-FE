import React, { useEffect, useState } from 'react'
import { authService } from '../../services';
import toastService from '../../utils/toasterUtils';
import Loader from '../../components/common/Loader';
import { Lock, Mail, User } from 'lucide-react';
import utils from '../../utils/utils';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {

  const { logoutHandler } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();





  useEffect(() => {

    async function getUserProfile() {
      try {

        setLoading(true);
        const response = await authService.getUserProfile();

        console.log('response');
        console.log(response);
        if (response?.success && response?.data?.user) {

          setUserData(response.data.user);

        } else {

          toastService.error('User data not found, or something went wrong');
        }


      } catch (error) {

        toastService.error(error?.message ?? 'Error while getting user profile information');

      } finally {
        setLoading(false);
      }

    }

    getUserProfile();

  }, [setUserData])

  console.log('--userData');
  console.log(userData);



  async function handleUpdatePassword(e) {
    try {
      e.preventDefault();


      const valid = validateUserInputs();

      if (!valid)
        return;

      const params = { newPassword, currentPassword };

      setLoading(true);
      const response = await authService.changePassword(params);


      if (response.success) {

        toastService.success(response?.message ?? 'Password updated successfully');

        logoutHandler();
        navigate('/login');

      } else {
        toastService.error('Something went wrong while updating your password');

      }


    } catch (error) {

      toastService.error(error?.message ?? 'Error while changing the Password');

    } finally {

      setLoading(false);
    }
  }

  function validateUserInputs() {

    let valid = true;

    if (!currentPassword) {

      toastService.warning('Current Password field is empty');
      valid = false;
    }


    if (!newPassword) {

      toastService.warning('New Password field is empty.');
      valid = false;
    }

    if (!confirmNewPassword) {

      toastService.warning('Confirmed new Password field is empty.');
      valid = false;
    }

    if (newPassword && !utils.isStrongPassword(newPassword)) {

      toastService.warning('New Password Very weak.');
      valid = false;
    }

    if (newPassword && confirmNewPassword && (newPassword !== confirmNewPassword)) {

      toastService.warning('New Password and Confirmed password not identical.');
      valid = false;

    }

    return valid;
  }



  if (loading) {
    return <Loader />;
  }



  return (
    <div className=' flex flex-col min-h-screen space-y-7 p-4 '>
      {/*  user Information section*/}
      <div className='border bg-white/80 border-slate-300/70 rounded-xl p-4 shadow-sm'>
        <p className='text-2xl font-semibold md:text-3xl tracking-tight pb-8'>User Information</p>

        <div>
          <span className=''>UserName</span>
          <div className='pb-4 relative pt-4'>

            <div className='absolute inset-y-0  pl-2 flex items-center pointer-events-none text-slate-400'>
              <User className="h-5 w-5" strokeWidth={2} />
            </div>

            <input
              className='w-full h-12 pl-8 pr-4 border-2 border-slate-200 rounded-xl bg-slate-200/80 text-slate-700 placeholder-slate-400 text-lg '
              value={userData?.username ?? 'N/A'}
              disabled={true}
            />
          </div>

        </div>

        <span className=''>Email</span>
        <div className='pb-4 relative pt-4'>

          <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none text-slate-400'>
            <Mail className="h-5 w-5" strokeWidth={2} />
          </div>

          <input
            className='w-full h-12 pl-10 pr-4 border-2 border-slate-200 rounded-xl bg-slate-200/80 text-slate-700 placeholder-slate-400 text-lg '
            value={userData?.email ?? 'N/A'}
            type='email'
          />
        </div>

      </div>

      {/* change the password section */}

      <div className='border bg-white/80 border-slate-300/70 rounded-xl p-4 shadow-sm'>
        <p className='text-2xl font-semibold md:text-3xl tracking-tight' >Change password</p>


        <div>
          <span className=''>Current Password</span>
          <div className='pb-4 relative pt-4'>

            <div className='absolute inset-y-0  pl-2 flex items-center pointer-events-none text-slate-400'>
              <Lock className="h-5 w-5" strokeWidth={2} />
            </div>

            <input
              className='w-full h-12 pl-8 pr-4 border-2 border-slate-400 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 text-lg '
              value={currentPassword}
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

        </div>

        <div>
          <span className=''>New Password</span>
          <div className='pb-4 relative pt-4'>

            <div className='absolute inset-y-0  pl-2 flex items-center pointer-events-none text-slate-400'>
              <Lock className="h-5 w-5" strokeWidth={2} />
            </div>

            <input
              className='w-full h-12 pl-8 pr-4 border-2 border-slate-400 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 text-lg '
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}

            />
          </div>

        </div>


        <div>
          <span className=''>Confirm New Password</span>
          <div className='pb-4 relative pt-4'>

            <div className='absolute inset-y-0  pl-2 flex items-center pointer-events-none text-slate-400'>
              <Lock className="h-5 w-5" strokeWidth={2} />
            </div>

            <input
              className='w-full h-12 pl-8 pr-4 border-2 border-slate-400 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 text-lg '
              value={confirmNewPassword}
              type="password"

              onChange={(e) => setConfirmNewPassword(e.target.value)}

            />
          </div>

        </div>

        <div className=' text-right'>

          <button
            className='p-3 text-lg bg-violet-400 rounded-xl shadow-md text-white font-semibold  hover:bg-violet-600 cursor-pointer hover:shadow-xl transition-colors duration-200'
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </div>
      </div>

    </div>
  )
}
