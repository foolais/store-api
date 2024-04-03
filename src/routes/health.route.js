const { Router } = require('express');

const HealthRouter = Router();

HealthRouter.get('/', (req, res) => {
  res.status(200).send({ data: 'OK' });
});

module.exports = { HealthRouter };
