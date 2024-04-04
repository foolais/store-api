const { getAllOrderData, addOrderData } = require('../services/order.services');
const { errorResponse, badRequestResponse, successResponse } = require('../utils/response');
const { createOrderValidation } = require('../validations/order.validation');

const getAllOrder = async (req, res) => {
  try {
    const order = await getAllOrderData();
    res.send({ order });
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Table data', error, res);
  }
};

const addOrder = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST Order data', null, res);
  }

  const { error, value } = createOrderValidation(req.body);

  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST Order data', null, res);
  }

  try {
    await addOrderData(value);
    return successResponse(201, null, 'Data Berhasil Ditambahkan', 'POST Order data', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST order data', error, res);
  }
};

module.exports = { getAllOrder, addOrder };
