import validator from 'validator';

export const validateNewRoomCreation = ({name, description, tags}) => {
  let errors = {};

  if (validator.isEmpty(name)) {
    errors.name = 'Room name field is required';
  }

  if (validator.isEmpty(description)) {
    errors.description = 'Description field is required';
  }

  if (!tags.length) {
    errors.tags = 'Provide at least 1 tag';
  } else if (tags.length > 4) {
    errors.tags = 'Up to 4 tags allowed';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};