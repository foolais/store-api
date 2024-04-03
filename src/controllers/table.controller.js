const { getAllTable, addTableData, getTableById } = require('../services/table.services');
const { successResponse, errorResponse, badRequestResponse, notFoundResponse } = require('../utils/response');
const { createTableValidation } = require('../validations/table.validation');

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
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST Table data', error, res);
  }
};

module.exports = { getTable, createTable };
