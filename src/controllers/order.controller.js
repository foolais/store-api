const {
  getAllOrderData,
  addOrderData,
  updateOrderDataById,
  deleteOrderDataById
} = require('../services/order.services');
const { errorResponse, badRequestResponse, successResponse, notFoundResponse } = require('../utils/response');
const { createOrUpdateOrderValidation } = require('../validations/order.validation');

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

  const { error, value } = createOrUpdateOrderValidation(req.body);

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

const updateOrder = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'PUT Order data', null, res);
  }

  const { error, value } = createOrUpdateOrderValidation(req.body);

  // error handling bad request PUT data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'PUT Order data', null, res);
  }
  try {
    // get id params
    const { id } = req.params;
    const result = await updateOrderDataById(id, value);
    // conditional result
    if (result) {
      return successResponse(200, null, 'Data Berhasil Diupdate', 'PUT Order data', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'PUT Order data', null, res);
  } catch (error) {
    // catch error handling
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'PUT Order data', error, res);
  }
};

const deleteOrder = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    const result = await deleteOrderDataById(id);
    if (result) {
      return successResponse(200, null, 'Data Berhasil Dihapus', 'DELETE Order data  by ID', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'DELETE Order data by ID', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'DELETE Order data by ID', error, res);
  }
};

module.exports = { getAllOrder, addOrder, updateOrder, deleteOrder };
