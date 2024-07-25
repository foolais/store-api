const { Router } = require('express');
const { getOverview, getEarningsPerMonth } = require('../controllers/overview.controller');

const OverviewRouter = Router();

OverviewRouter.get('/', getOverview);
OverviewRouter.get('/earnings', getEarningsPerMonth);

module.exports = OverviewRouter;
