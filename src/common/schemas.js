import * as Yup from 'yup';

export const onboardValidationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  apartment: Yup.string().required('Apartment is required'),
  numBlocks: Yup.number().required('Number of blocks is required'),
  numFlatsPerBlock: Yup
    .number()
    .required('Number of flats per block is required'),
  addressLine1: Yup.string().required('Address line 1 is required'),
});
export const onBoardNewApartmentSchema = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Apartment name is required';
  }
  if (!values.totalFlats || values.totalFlats <= 0) {
    errors.totalFlats = 'Total number of flats must be at least 1';
  }
  if (!values.line1) {
    errors.line1 = 'Address Line 1 is required';
  }
  if (!values.line2) {
    errors.line2 = 'Address Line 2 is required';
  }
  if (!values.postalCode) {
    errors.postalCode = 'Postal code is required';
  }
  if (!values.cityId) {
    errors.cityId = 'City is required';
  }
  return errors;
};


export const validatePrepaidMeterFields = (meterName, description, costPerUnit) => {
  let valid = true;
  let errors = {};

  if (!meterName.trim()) {
    errors.meterName = 'Meter Name is required';
    valid = false;
  }

  if (!description.trim()) {
    errors.description = 'Description is required';
    valid = false;
  }

  if (!costPerUnit.trim()) {
    errors.costPerUnit = 'Cost Per Unit is required';
    valid = false;
  } else if (isNaN(costPerUnit) || parseFloat(costPerUnit) <= 0) {
    errors.costPerUnit = 'Cost Per Unit must be a positive number';
    valid = false;
  }

  return { valid, errors };
};


export const ExpancesValidation = (date, transactionType, description, amount) => {
  const errors = {};

  if (!date) {
    errors.date = 'Please select a date.';
  }

  if (!transactionType) {
    errors.transactionType = 'select transaction type.';
  }

  if (!description) {
    errors.description = 'Please enter a description.';
  }

  if (!amount || isNaN(amount)) {
    errors.amount = 'Please enter a valid amount.';
  }

  return errors;
};


export const RegisterValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, 'Minimum 3 Characters required')
    .max(25, 'Maximum 25 Charachers Allow')
    .required('First Name required'),
  lastName: Yup.string().trim().required('Last Name required'),
  phone: Yup.string().trim().required('phone number required'),
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email required'),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});
export const UpdatePasswordValidation = Yup.object({
  currentPassword: Yup.string()
    .trim()
    .required('Password required'),
    newPassword: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('New Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('newPassword'), null], 'Password not Matched'),
    // gotra: Yup.string()
    // .required('Confirm Your Password')
    // .oneOf([Yup.ref('password'), null], 'Enter your Gotra'),

});

export const AddTampleSchema = Yup.object({
  tampleName: Yup.string().trim().required('Temple Name required'),
  description: Yup.string().trim().required('Description required'),
  // community: Yup.string().trim().required('Community is requires'),
});
export const AddEventSchema = Yup.object({
  eventName: Yup.string().required('Event Name required'),
  description: Yup.string().trim().required('Description required'),
  // community: Yup.string().trim().required('you are not a admin to Add'),
});
export const AddTampleSchemaS2 = Yup.object({
  pinCode: Yup.string().trim().required('Pincode required'),
  line1: Yup.string().trim().required('line1 required'),
  line2: Yup.string().trim().required('line2 required'),
  line3: Yup.string().trim().required('line3 required'),
});
export const AddTampleSchemaS3 = Yup.object({
  // employeId: Yup.string().trim().required('employee Id is required'),
  employeId: Yup.string()
    .email('Invalid EmployeeId')
    .required('Employee id required'),
});
export const LoginValidationSchema = Yup.object({
  email: Yup.string().required('Mobile number or Email required'),
  password: Yup.string().trim().required('Password required'),
});
export const createPostScheme = Yup.object({
  caption: Yup.string().required('caption required'),
});
export const Gotra = Yup.object({
  caption: Yup.string().required('Enter your Gotra'),
});


export const forgotPasswordSchema = Yup.object({
 
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});
export const UpdateProfileValidation = Yup.object({
  name: Yup.string().trim().required('Name required'),
  phone: Yup.string().trim().required('phone number required'),


})