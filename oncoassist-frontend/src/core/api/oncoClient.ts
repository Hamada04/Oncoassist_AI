import axios from 'axios';

// هذا هو المحرك الأساسي للتواصل مع Backend (FastAPI)
const oncoClient = axios.create({
  // استبدل هذا الرابط لاحقاً برابط الـ Deploy على Render.com
  baseURL: 'http://localhost:8000', 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// التعامل مع الأخطاء بشكل مركزي لضمان تجربة مستخدم نظيفة
oncoClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default oncoClient;