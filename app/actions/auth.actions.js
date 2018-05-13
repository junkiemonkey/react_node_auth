import axios from 'axios';
import { createAction } from 'redux-actions';
import {LOGIN, REG, CHECK_AUTH, LOGOUT, SUCCESS, FAIL} from '../constants';

const loginDoneAction = createAction(LOGIN + SUCCESS);
const loginFailAction = createAction(LOGIN + FAIL);
const regDoneAction = createAction(REG + SUCCESS);
const regFailAction = createAction(REG + FAIL);
const checkAuthDoneAction = createAction(CHECK_AUTH + SUCCESS);
const checkAuthFailAction = createAction(CHECK_AUTH + FAIL);


export const login = (email, password) => dispatch => {
  axios.post('/api/login/', { email, password }, {
    withCredentials: true,
  })
    .then(({ data }) => dispatch(loginDoneAction(data)))
    .catch(({ response: { data } }) => dispatch(loginFailAction(data)));
};

export const logout = () => dispatch => {
  axios.post('/api/logout/')
    .then(() => dispatch(createAction(LOGOUT + SUCCESS)))
    .catch(() => dispatch(createAction(LOGOUT + FAIL)));
};

export const registration = data => dispatch => {
  axios.post('/api/registration/', data)
    .then(({ data }) => dispatch(regDoneAction(data)))
    .catch(({ response: { data } }) => dispatch(regFailAction(data)));
};

export const checkAuth = () => dispatch => {
  axios.get('/api/check/')
    .then(({ data }) => dispatch(checkAuthDoneAction(data)))
    .catch(({ response: { data } }) => dispatch(checkAuthFailAction(data)));
};



// export function logout() {
//   return {
//     type: LOGOUT,
//     callAPI: '/api/logout/'
//   };
// }
//
// export function registrate(username, email, password) {
//   return {
//     type: REG,
//     payload: {username, email, password},
//     callAPI: '/api/registration/'
//   };
// }
//
// export function checkAuth() {
//   return {
//     type: CHECK_AUTH,
//     callAPI: '/api/check/'
//   };
// }
