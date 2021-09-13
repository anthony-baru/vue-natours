import axios from 'axios';
import { showAlert } from './alert';

export const signin = async (email, password) => {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signin',
      data: { email, password },
    });
    if (result.data.status == 'success') {
      showAlert('success', 'Logged in successfully');
      // document.cookie = `jwt=${result.data.token}`;
      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    console.log(result);
    if (result.data.status === 'success') {
      // location.reload();
      location.assign('/signin');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out!');
  }
};
