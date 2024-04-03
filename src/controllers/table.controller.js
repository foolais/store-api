const { getAllTable, addTableData } = require('../services/table.services');
const { successResponse, serverErrorResponse, badRequestResponse } = require('../utils/response');
const { createTableValidation } = require('../validations/table.validation');

const getTable = async (req, res) => {
  try {
    const table = await getAllTable();
    if (table) {
      return successResponse(200, table, 'Berhasil Mengambil Data', 'GET Table data', null, res);
    } else {
      return serverErrorResponse(404, null, 'Data Tidak Ditemukan', 'GET Table data', null, res);
    }
  } catch (error) {
    return serverErrorResponse(500, null, 'Internal Server Error', 'GET Table data', error, res);
  }
};

const createTable = async (req, res) => {
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
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan Data yang Sama', 'POST Table data', null, res);
    }
    return serverErrorResponse(500, null, 'Internal Server Error', 'POST Table data', error, res);
  }
};

module.exports = { getTable, createTable };
