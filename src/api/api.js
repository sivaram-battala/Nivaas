import axios from 'axios';
import base64 from 'react-native-base64';
import {
  getAuthTokenDetails,
  getClientCredentials,
  removeLoginSessionDetails,
  saveUserDetails,
} from '../utils/preferences/localStorage';
import Snackbar from 'react-native-snackbar';
import { allTexts } from '../common';
import RNRestart from 'react-native-restart';


// ****   production Api base urls   *** //
export const BASE_URL = 'http://20.235.89.214:8082/api/';
export const BASEURL = 'https://fanfun.in/customer/api/';
export const BASE = 'https://fanfun.in/media/';
export const POPULARURL = 'https://fanfun.in/profile/';
export const MEMBER_SHIP_URL = 'https://fanfun.in/membership';
export const EVENTS_URL = 'https://fanfun.in/events/';
export const DONATION_URL = 'https://fanfun.in/donations/';
export const TEMPLE_ADDRESS = 'https://fanfun.in/customer/';


// export const BASE_URL = 'http://20.235.89.214:8082/api/';
// export const BASEURL = 'https://kovela.app/customer/api/';
// export const BASE = 'https://kovela.app/media/';
// export const POPULARURL = 'https://kovela.app/profile/';
// export const MEMBER_SHIP_URL = 'https://kovela.app/membership/';
// export const EVENTS_URL = 'https://kovela.app/events/';
// export const DONATION_URL = 'https://kovela.app/donations/';
// export const TEMPLE_ADDRESS = 'https://kovela.app/customer/';
// export const LOCAL_HOST = 'https://kovela.app/shop/';
// export const BROADLEAF = 'https://kovela.app/shop/';


//NIVAAS
export const NIVAAS_URL = 'https://fanfun.in/nivaascustomer/nivaas/api/'


let bearer_token = getAuthTokenDetails();
export const authAxiousInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic' + base64.encode('skillrat-client:skillrat@2021'),
  },
});

export const authAxiousInstance1 = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAxiousForgotPassword = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAxiosAddTempId = axios.create({
  baseURL: BASE_URL,
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: 'Basic' + base64.encode('skillrat-clint:skillrat@2021'),
});

export const axiousInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
});

export const axiosMultiPartFormData1 = axios.create({
  baseURL: BASE,
  headers: {
    Authorization: bearer_token,
  },
});
axiosMultiPartFormData1.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  // console.log('Sending req with this token', token);
  config.headers.Authorization = token;
  return config;
});

export const axiosNotifications = axios.create({
  baseURL: POPULARURL,
  headers: {
    Authorization: bearer_token,
  },
});
axiosNotifications.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  // console.log('Sending req with this token', token);
  config.headers.Authorization = token;
  return config;
});
export const axiosDonation = axios.create({
  baseURL: DONATION_URL,
  headers: {
    Authorization: bearer_token,
  },
});

axiosDonation.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  // console.log('Sending req with this token', token);
  config.headers.Authorization = token;
  return config;
});
export const axiosEventsData1 = axios.create({
  baseURL: EVENTS_URL,
  headers: {
    Authorization: bearer_token,
  },
});
axiosEventsData1.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  config.headers.Authorization = token;
  return config;
});
export const axiosMultiPartFormDataMem = axios.create({
  baseURL: MEMBER_SHIP_URL,
  headers: {
    Authorization: bearer_token,
  },
});
axiosMultiPartFormDataMem.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  // console.log('Sending req with this token', token);
  config.headers.Authorization = token;
  return config;
});
export const axiosNewDataSave = axios.create({
  baseURL: BASE,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: bearer_token,
  },
});
axiosNewDataSave.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  config.headers.Authorization = token;
  return config;
});
export const axiosNewData = axios.create({
  baseURL: POPULARURL,
  headers: {
    Authorization: bearer_token,
  },
});
axiosNewData.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  config.headers.Authorization = token;
  return config;
});

export const axiosNewData1 = axios.create({
  baseURL: BASE,
  headers: {
    Authorization: bearer_token,
  },
})

axiosNewData1.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  config.headers.Authorization = token;
  return config;
})

export const axiousInstanceNew = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: bearer_token,
  },
});
export const axiousInstanceNew1 = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: bearer_token,
  },
});
axiousInstanceNew1.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  config.headers.Authorization = token;
  return config;
});

export const axiousInstanceNewSignIn = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiousInstance.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  let clientToken = await getClientCredentials();
  config.headers.Authorization = token || clientToken.clientToken;
  return config;
})


export const axiosMultiPartFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: '*',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
})


axiosMultiPartFormData.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  let clientToken = await getClientCredentials();
  config.headers.Authorization = token || clientToken.clientToken;
  return config;
})
axiousInstance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      let token = await getAuthTokenDetails();
      if (token) {
        await removeLoginSessionDetails();
        saveUserDetails('');
        RNRestart.Restart();
        return axios(config);
      }
    }
    return Promise.reject(error);
  },
)

axiousInstance.interceptors.response.use(
  response => response,
  async error => {
    const { config, message } = error;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    // retry while Network timeout or Network Error
    if (!(message.includes('timeout') || message.includes('Network Error'))) {
      return Promise.reject(error);
    }
    config.retry -= 1;
    const delayRetryRequest = new Promise(resolve => {
      setTimeout(() => {
        console.log('retry the request', config.url);
        resolve();
      }, config.retryDelay || 1000);
    });
    Snackbar.show({
      text: allTexts.constants.noInternet,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'Try again',
        textColor: 'green',
        onPress: () => { },
      },
    });
    return delayRetryRequest.then(() => axios(config));
  },
)
