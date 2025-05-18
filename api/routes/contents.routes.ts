const router = require('express').Router();
const controller = require('../controllers/contents.controller');
const isAuthenticated = require("../middleware/isAuthenticated");
const isUploader = require('../middleware/isUploader');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', isAuthenticated, controller.getAllContent);

router.get('/:contentId', isAuthenticated, controller.getContentById);

router.post('/', isAuthenticated, isUploader,  upload.single('file'), controller.createContent);
router.post('/:contentId', isAuthenticated, isUploader,  upload.single('file'), controller.updateContent);

router.put('/:catId', isAuthenticated ,isUploader, controller.updateContent);

router.delete('/:catId', isAuthenticated, isUploader, controller.deleteContent);

router.post('/:id/rate', isAuthenticated, controller.rateContent);

module.exports = router;