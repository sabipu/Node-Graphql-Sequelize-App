import * as express from "express";
import { userController } from '#root/controller/userController';

const router = express.Router();

router.get('/api/v1/users', userController.getAllUsers);
router.post('/api/v1/createNewUser', userController.createUserResolver);

router.post('/api/v1/createNewSite', userController.createSiteResolver);

export default router;