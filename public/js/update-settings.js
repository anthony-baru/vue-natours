import axios from 'axios';
import { showAlert } from './alert';

//type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const result = await axios({
      method: 'PATCH',
      url:
        type === 'data'
          ? 'http://localhost:3000/api/v1/users/update-me'
          : ' http://localhost:3000/api/v1/users/update-password',
      data: data,
    });
    console.log(result);
    if (result.data.status == 'success') {
      showAlert('success', 'Settings changed successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
