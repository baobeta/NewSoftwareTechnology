const {
  list,
  findOne,
  update,
  viewProfile,
  editProfile,
} = require('../controller/user.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/check-status', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });
  app.get('/v1/user', isAuth, list);
  app.get('/v1/user/:id', findOne);
  app.put('/v1/user/:id', isAuth, update);

  app.get('/v1/profile', isAuth, viewProfile);
  app.post('/v1/profile', isAuth, editProfile);
};

module.exports = router;
