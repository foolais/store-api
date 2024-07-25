const { getOverviewData, getDataForMonth } = require('../services/overview.services');
const { errorResponse, successResponse, notFoundResponse } = require('../utils/response');

const getOverview = async (req, res) => {
  try {
    const data = await getOverviewData();
    if (data) {
      successResponse(200, data, 'Berhasil Mengambil Data', 'GET Overview data', null, res);
    } else {
      notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Overview data', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Overview data', error, res);
  }
};

const getEarningsPerMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    const data = await getDataForMonth(year, month);
    if (data) {
      successResponse(200, data, 'Berhasil Mengambil Data', 'GET Overview data', null, res);
    } else {
      notFoundResponse(404, null, 'Data Tidak Ditemukan', 'GET Overview data', null, res);
    }
  } catch (error) {
    return errorResponse(500, null, `Internal Server Error: ${error}`, 'GET Overview data', error, res);
  }
};

module.exports = { getOverview, getEarningsPerMonth };
