const router = require('express').Router();
const controller = require('../controllers/categories.controller');
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require('../middleware/isAdmin');

router.get('/', isAuthenticated, controller.getAllCategory);

router.post('/', isAuthenticated, isAdmin, controller.createCategory);

router.put('/:catId', isAuthenticated ,isAdmin, controller.updateCategory);

router.delete('/:catId', isAuthenticated, isAdmin, controller.deleteCategory);

module.exports = router;