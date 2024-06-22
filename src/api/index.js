
export const endpoints = {
  NIVAAS_OTP_TRIGGER:'nivaas/api/auth/jtuserotp/trigger',
  NIVAAS_SIGN_IN:'nivaas/api/auth/signin',
  NIVAAS_CURRENT_CUSTOMER:'nivaas/api/auth/currentCustomer',
  NIVAAS_PROFILE_PIC:'api/customer/upload',
  NIVAAS_CITY:'jtcity/list',
  NIVAAS_APARTMENT:'jtapartment/nearByApartments',
  NIVAAS_FLAT:'jtflat/apartment/flats',
  GET_POSTALCODES:'jtpostalcode/list',
  NIVAAS_ONBOARD : 'onboarding/flat/request',
  NIVAAS_NEW_APARTMENT_ONBOARD:'jtapartment/save',
  ADD_PREPAIDMETER:'/prepaidmeter/save',
  GET_APARTMENT_PREPAID_METERS:'prepaidmeter/list',
  UPDATE_PREPAID_METER:'prepaidmeter/update',
  ONBOARD_NEW_FLATS:'jtflat/bulk/onboard',
  UPDATE_ONBOARDED_FLATS_DETAILS:'jtflat/apartment',
  USER_DETAILS:'api/customer/userDetails',
  MAINTAINENCE_SAVE:'jtmaintanance/save',
  ADD_CONSUMED_UNITS:'/prepaid-usage/flat/update-consumed',
  SOCIETY_DUES:'society/dues',
  GET_EXPANCES:'apartment/debit-history/apartment',
  GET_EXPANCES_BY_ID:'apartment/debit-history',
  GET_EXPANCES_PDF:'report/apartment',
  ADD_DEBIT_HISTORY:'apartment/debit-history',
  DELETE_EXPANCES:'apartment/debit-history/apartment',
  UPDATE_DEBIT_HISTORY:'apartment/debit-history',
  ADD_CO_ADMIN:'jtapartment/add/co-admin',
};

// export const getcurrentCustomerdata = () =>{
//   currentCustomer()
//       .unwrap()
//       .then(response => {
//         console.log("CURRENT CUSTOMERrrrrrrrrrrrr ===>",response);
//       })
//       .catch(error => {
//         console.log('error in currentCustomerrrrr===>', error);
//       });
// }
