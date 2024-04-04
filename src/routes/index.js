const TableRouter = require('./table.route');
const MenuRouter = require('./menu.route');
const OrderRouter = require('./order.route');

const _routes = [
  ['/table', TableRouter],
  ['/menu', MenuRouter],
  ['/order', OrderRouter]
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [path, router] = route;
    app.use(path, router);
  });
};

module.exports = routes;
