import '@babel/polyfill';
import { displayMap } from './mapbox';
import { logout, signin } from './signin';
import { updateSettings } from './update-settings';
import { bookTour } from './stripe';

//DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--signin');
const logOutButton = document.querySelector('.nav__el--logout');
const changeSettingsForm = document.querySelector('.form-user-data');
const changePasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

//delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signin(email, password);
  });
}

if (logOutButton) {
  console.log('hi from button logut');
  logOutButton.addEventListener('click', logout);
}

if (changeSettingsForm) {
  changeSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    form.append('name', name);
    form.append('email', email);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    // let data = { form, name };
    updateSettings(form, 'data');
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    let currentPassword =
      document.getElementsByClassName('current-password')[0].value;
    let newPassword = document.getElementsByClassName('new-password')[0].value;
    let confirmNewPassword = document.getElementsByClassName(
      'confirm-new-password'
    )[0].value;
    let data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
      newPasswordConfirm: confirmNewPassword,
    };
    await updateSettings(data, 'password');
    document.querySelector('.btn--save-password').textContent = 'save password';
    document.getElementsByClassName('current-password')[0].value = '';
    document.getElementsByClassName('new-password')[0].value = '';
    document.getElementsByClassName('confirm-new-password')[0].value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
