const { getAllTable } = require('../services/table.services');
const { successResponse, serverErrorResponse } = require('../utils/response');

const getTable = async (req, res) => {
  try {
    const table = await getAllTable();
    if (table) {
      successResponse(200, table, 'Berhasil Mengambil Data', 'GET Table data', 'GET', null, res);
    } else {
      serverErrorResponse(404, null, 'Data Tidak Ditemukan', 'GET Table data', 'GET', null, res);
    }
  } catch (error) {
    serverErrorResponse(500, null, 'Internal Server Error', 'GET Table data', 'GET', error, res);
  }
};

module.exports = { getTable };
