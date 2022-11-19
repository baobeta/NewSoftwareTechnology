const {
  insertTopic, listTopic, updateTopic, deleteTopic, findOneTopic, searchTopic,
} = require('../controller/topic.controller');

const authMiddleware = require('../middlewares/auth.middlewares');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.post('/v1/topic', isAuth, insertTopic);
  app.get('/v1/topic/:id', isAuth, findOneTopic);
  app.get('/v1/topic', listTopic); // public api in homepage
  app.get('/v1/topic-search', isAuth, searchTopic);
  app.put('/v1/topic/:id', isAuth, updateTopic);
  app.delete('/v1/topic/:id', isAuth, deleteTopic);
};

module.exports = router;
