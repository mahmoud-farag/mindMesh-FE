


// 'development' | 'production' | 'test'
const env_type: string = import.meta.env.MODE;

export const BASE_URL: string = env_type === 'production' ? 'will be later'
  :
  env_type === 'development' ?
    'http://localhost:4000'
    :
    'will be later';


