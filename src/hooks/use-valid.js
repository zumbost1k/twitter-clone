const validators = {
  isEmpty: (stringToCheck) => {
    return stringToCheck.length === 0;
  },
  lengthCheck: (stringToCheck) => {
    return stringToCheck.length <= 6;
  },
};

export const useValid = (stringToCheck, validatorsForString) => {
  let isValid = true;
  validatorsForString.forEach((validator) => {
    if (
      validators[validator] &&
      validators[validator](stringToCheck.toString())
    ) {
      isValid = false;
    }
  });
  return isValid;
};
