const TableRouter = require('./table.route');
const MenuRouter = require('./menu.route');

const _routes = [
  ['/table', TableRouter],
  ['/menu', MenuRouter]
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [path, router] = route;
    app.use(path, router);
  });
};

module.exports = routes;
