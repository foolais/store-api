const { getAllMenu, getMenuById, addMenuData, updateMenuData } = require('../services/menu.services');
const { successResponse, notFoundResponse, errorResponse, badRequestResponse } = require('../utils/response');
const { createMenuValidation, updateMenuValidation } = require('../validations/menu.validation');

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

const addMenu = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'POST Menu data', null, res);
  }

  const { error, value } = createMenuValidation(req.body);

  // error handling bad request post data
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'POST Menu data', null, res);
  }

  try {
    await addMenuData(value);
    return successResponse(201, null, 'Data Berhasil Ditambahkan', 'POST Menu data', null, res);
  } catch (error) {
    // catch error handling
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan Data yang Sama', 'POST Menu data', null, res);
    }
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'POST Menu data', error, res);
  }
};

const updateMenu = async (req, res) => {
  // check empty body
  if (Object.keys(req.body).length === 0) {
    return badRequestResponse(400, null, 'Request Body Tidak Boleh Kosong', 'PUT Menu data', null, res);
  }

  // error handling bad request post data
  const { error, value } = updateMenuValidation(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return badRequestResponse(400, null, errorMessage, 'PUT Menu data', null, res);
  }

  try {
    // get id params
    const { id } = req.params;

    const result = await updateMenuData(id, value);
    // conditional Result
    if (result) {
      return successResponse(200, null, 'Data Berhasil Diupdate', 'PUT Menu data', null, res);
    }
    return notFoundResponse(404, null, 'Data Tidak Ditemukan', 'PUT Menu data', null, res);
  } catch (error) {
    // catch error handling
    if (error.code === 11000) {
      return badRequestResponse(400, null, 'Tidak Bisa Menambahkan Data yang Sama', 'PUT Menu data', null, res);
    }
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'PUT Menu data', error, res);
  }
};

module.exports = { getMenu, addMenu, updateMenu };
