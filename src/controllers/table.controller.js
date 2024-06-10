const {
  getAllTable,
  addTableData,
  getTableById,
  updateTableData,
  deleteTableById,
  deleteAllTableData,
  changeOrderTableData
} = require('../services/table.services');
const { successResponse, errorResponse, badRequestResponse, notFoundResponse } = require('../utils/response');
const { validateChangeStatusOrder } = require('../validations/order.validation');
const { createTableValidation, updateTableValidation } = require('../validations/table.validation');

const getTable = async (req, res) => {
  try {
    // get from query
    const { id } = req.params;

    if (id) {
      const table = await getTableById(id);
      if (table) {
        successResponse(200, table, 'Berhasil Mengambil Data', 'GET Table data by Id', null, res);
      } else {
        notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Table data by Id', null, res);
      }
    } else {
      // get all table
      const table = await getAllTable();
      if (table) {
        return successResponse(200, table, 'Berhasil Mengambil Data', 'GET Table data', null, res);
      } else {
        return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Table data', null, res);
      }
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Table data', error, res);
  }
};

const createTable = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST Table data', null, res);
  }

  const { error, value } = createTableValidation(req.body);

  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST Table data', null, res);
  }

  try {
    await addTableData(value);
    return successResponse(201, null, 'Data Berhasil Ditambahkan', 'POST Table data', null, res);
  } catch (error) {
    // catch error handling
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan Data yang Sama', 'POST Table data', null, res);
    }
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST Table data', error, res);
  }
};

const updateTable = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'PUT Table data', null, res);
  }

  // error handling bad request post data
  const { error, value } = updateTableValidation(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'PUT Table data', null, res);
  }

  try {
    // get id params
    const { id } = req.params;
    const result = await updateTableData(id, value);
    // conditional Result
    if (result) {
      return successResponse(200, null, 'Data Berhasil Diupdate', 'PUT Table data', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'PUT Table data', null, res);
  } catch (error) {
    // catch error handling
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan Data yang Sama', 'PUT Table data', null, res);
    }
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'PUT Table data', error, res);
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTableById(id);
    if (result) {
      return successResponse(200, null, 'Data Berhasil Dihapus', 'DELETE Table data  by ID', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'DELETE Table data by ID', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'DELETE Table data by ID', error, res);
  }
};

const deleteAllTable = async (req, res) => {
  try {
    const result = await deleteAllTableData();
    if (result) {
      return successResponse(200, null, 'Semua Data Berhasil Dihapus', 'DELETE Table data', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'DELETE Table all data', error, res);
  }
};

const changeOrderTable = async (req, res) => {
  const { error, value } = validateChangeStatusOrder(req.query);

  if (error) return badRequestResponse(400, null, error, 'POST change is order table', null, res);

  try {
    const { id } = value;

    const result = await changeOrderTableData(id, value);
    if (result) {
      return successResponse(
        200,
        null,
        'Berhasil mengganti status order table',
        'POST change is order table',
        null,
        res
      );
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'POST change is order table', null, res);
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST change is order table', error, res);
  }
};

module.exports = { getTable, createTable, updateTable, deleteTable, deleteAllTable, changeOrderTable };
