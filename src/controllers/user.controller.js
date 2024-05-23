const { createUserData, getUsersByEmail } = require('../services/user.services');
const { createUserValidation, createSessionValidation } = require('../validations/user.validation');
const { successResponse, badRequestResponse, errorResponse } = require('../utils/response');
const { hashing, comparePassword } = require('../utils/hashing');
const { signJwt } = require('../utils/jwt');

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

const createSession = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST create user data', null, res);
  }

  const { error, value } = createSessionValidation(req.body);
  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST create user data', null, res);
  }

  try {
    const user = await getUsersByEmail(value.email);
    const isValid = comparePassword(value.password, user.password);

    if (!isValid) {
      return errorResponse(401, null, 'Invalid Email or Password', 'POST create session data', null, res);
    }

    const accessToken = signJwt({ ...user }, { expiresIn: '12h' });

    const data = {
      email: user.email,
      username: user.username,
      role: user.role,
      token: accessToken
    };

    return successResponse(200, data, 'Login Berhasil Berhasil', 'POST create session data', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST create user data', error, res);
  }
};

module.exports = { createUser, createSession };
