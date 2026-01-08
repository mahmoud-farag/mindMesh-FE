

const utils = {};

utils.isValidEmail = (email = '') => {
  if (!email) return false;

  const value = email.trim().toLowerCase();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(value);
};


utils.isStrongPassword = (password = '') => {
  if (!password) return false;

  const value = password.trim();

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  return strongPasswordRegex.test(value);
}


utils.formateFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);

    const formatted = size.toFixed(1);

    return `${formatted} ${units[i]}`;
  }




export default utils;