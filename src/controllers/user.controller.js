const { createUserData } = require('../services/user.services');
const { createUserValidation } = require('../validations/user.validation');
const { successResponse, badRequestResponse, errorResponse } = require('../utils/response');
const hashing = require('../utils/hashing');

const createUser = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST create user data', null, res);
  }

  const { error, value } = createUserValidation(req.body);

  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST create user data', null, res);
  }

  try {
    value.password = await hashing(value.password);
    await createUserData(value);
    return successResponse(201, null, 'User Berhasil Ditambahkan', 'POST create user data', null, res);
  } catch (error) {
    // catch error handling
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan User yang Sama', 'POST create user data', null, res);
    }
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST create user data', error, res);
  }
};

module.exports = { createUser };
