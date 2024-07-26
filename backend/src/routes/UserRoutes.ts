import express from 'express';
import controller from '../controllers/UserControl';

const router = express.Router();

router.post('/createUser', controller.userController.createUser);

export = router;
