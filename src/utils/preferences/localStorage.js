import {PreferencesKeys} from './preferencesKeys';
import {
  storeValue,
  getValue,
  storeObject,
  getObject,
  storeleafValue,
  getLeafValue,
} from './asyncStoragePreferences';

export const saveLoginSessionDetails = async (tokenType, authToken) => {
  await storeValue(PreferencesKeys.authToken, tokenType + ' ' + authToken);
};
export const saveClientCredentials = async (tokenType, authToken) => {
  await storeValue(PreferencesKeys.clientToken, tokenType + ' ' + authToken);
};
export const saveBraodLeafClientCredentials = async (tokenType, authToken) => {
  await storeleafValue(PreferencesKeys.BasicAuth, tokenType + ' ' + authToken);
};
export const saveUserDetails = async data => {
  await storeObject(PreferencesKeys.userDetails, data);
};
export const getUserDetails = async () => {
  let details = await getObject(PreferencesKeys.userDetails);
  return details;
};
export const getLogionSessionDetails = async () => {
  let authToken = await getValue(PreferencesKeys.authToken);
  return {
    authToken: authToken.value || '',
  };
};
export const getClientCredentials = async () => {
  let clientToken = await getValue(PreferencesKeys.clientToken);
  return {
    clientToken: clientToken.value || '',
  };
};

export const getAuthTokenDetails = async () => {
  let authToken = await getValue(PreferencesKeys.authToken);
  // console.log('autht---', authToken.value);
  let bearerToken = authToken.value || '';
  
  return bearerToken;
};
export const getBroadLeafAuthTokenDetails = async () => {
  let authToken = await getLeafValue(PreferencesKeys.BasicAuth);
  // console.log('autht--- braod leaf', authToken.value);
  let bearerToken = authToken.value || '';
  return bearerToken;
};
export const getUserId = async () => {
  let userId = await getValue(PreferencesKeys.userId);
  return userId.value || '';
};

export const removeLoginSessionDetails = async () => {
  await storeValue(PreferencesKeys.BasicAuth, '');
};
export const removeStoreLoginSessionDetails = async () => {
  await storeleafValue(PreferencesKeys.authToken, '');
  console.log(PreferencesKeys.authToken)
};
export const removeClientCredentials = async () => {
  await storeValue(PreferencesKeys.clientToken, '');
};
