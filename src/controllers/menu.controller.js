const { getAllMenu, getMenuById } = require('../services/menu.services');
const { successResponse, notFoundResponse, errorResponse } = require('../utils/response');

const getMenu = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const table = await getMenuById(id);
      if (table) {
        successResponse(200, table, 'Berhasil Mengambil Data Menu by ID', 'GET Menu data by Id', null, res);
      } else {
        notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Menu data by Id', null, res);
      }
    } else {
      // get all menu
      const menu = await getAllMenu();
      if (menu) {
        return successResponse(200, menu, 'Berhasil Mengambil Semua Data Menu', 'GET Menu data', null, res);
      } else {
        return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Menu data', null, res);
      }
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Menu data', error, res);
  }
};

module.exports = { getMenu };
