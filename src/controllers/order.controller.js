const {
  getAllOrderData,
  addOrderData,
  updateOrderDataById,
  deleteOrderDataById,
  getOrderById,
  changeStatusOrderData,
  getOrderByTableID,
  toggleMenuOrderServedStatus
} = require('../services/order.services');
const { updateTableData } = require('../services/table.services');
const { errorResponse, badRequestResponse, successResponse, notFoundResponse } = require('../utils/response');
const {
  createOrUpdateOrderValidation,
  validateChangeStatusOrder,
  validateToogleServedStatus
} = require('../validations/order.validation');

const getAllOrder = async (req, res) => {
  try {
    const result = await getAllOrderData();
    if (result && result.length > 0) {
      successResponse(200, result, 'Berhasil Mengambil Data', 'GET All Order', null, res);
    } else {
      notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET All Order', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Table data', error, res);
  }
};

const getSingleOrder = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;
    const result = await getOrderById(id);
    if (result) {
      successResponse(200, result, 'Berhasil Mengambil Data', 'GET Order data by Id', null, res);
    } else {
      notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Order data by Id', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Table data', error, res);
  }
};

const getSingleOrderByTableID = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;
    const result = await getOrderByTableID(id);
    if (result) {
      successResponse(200, result, 'Berhasil Mengambil Data', 'GET Order data by Id', null, res);
    } else {
      notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Order data by Id', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Table data', error, res);
  }
};

const addOrder = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST Order data', null, res);
  }

  const { error, value } = createOrUpdateOrderValidation(req.body, false);

  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST Order data', null, res);
  }

  try {
    const [order, updateTableStatus] = await Promise.all([
      addOrderData(value),
      updateTableData(value.table._id, { is_order: true, status: 'waiting' })
    ]);

    if (order && updateTableStatus) {
      return successResponse(201, null, 'Data Berhasil Ditambahkan', 'POST Order data', null, res);
    } else {
      throw new Error();
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST order data', error, res);
  }
};

const updateOrder = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'PUT Order data', null, res);
  }

  const { error, value } = createOrUpdateOrderValidation(req.body, true);

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

    const order = await getOrderById(id);
    const tableId = order?.table?._id;

    const [result, updateTableStatus] = await Promise.all([
      deleteOrderDataById(id),
      updateTableData(tableId, { is_order: false, status: 'empty' })
    ]);
    if (result && updateTableStatus) {
      return successResponse(200, null, 'Data Berhasil Dihapus', 'DELETE Order data  by ID', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'DELETE Order data by ID', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'DELETE Order data by ID', error, res);
  }
};

const changeStatusOrder = async (req, res) => {
  const { error: errorQuery, value: valueQuery } = validateChangeStatusOrder(req.query, 'query');
  const { error: errorBody, value: valueBody } = validateChangeStatusOrder(req.body, 'body');

  if (errorQuery !== null || errorBody !== null) {
    return badRequestResponse(400, null, errorQuery || errorBody, 'POST change finish order data', null, res);
  }

  try {
    const order = await changeStatusOrderData(valueQuery, valueBody);

    if (order) {
      return successResponse(200, null, 'Berhasil mengganti status order', 'POST change status order data', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'POST change status order data', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST change status order data', error, res);
  }
};

const toggleMenuOrderServed = async (req, res) => {
  const { error, value } = validateToogleServedStatus(req.query);

  if (error) return badRequestResponse(400, null, error, 'POST toogle served order data', null, res);

  try {
    const order = await toggleMenuOrderServedStatus(value);

    if (order) {
      return successResponse(
        200,
        null,
        'Berhasil mengganti status served menu',
        'POST toogle served menu order data',
        null,
        res
      );
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'POST toogle served menu order data', null, res);
  } catch (error) {
    return errorResponse(
      500,
      null,
      `Internal Server Error: ${error}`,
      'POST toogle served menu order data',
      error,
      res
    );
  }
};

module.exports = {
  getAllOrder,
  getSingleOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  changeStatusOrder,
  getSingleOrderByTableID,
  toggleMenuOrderServed
};
//
