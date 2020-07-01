import * as express from "express";
import { userController } from '#root/controller/userController';
import { siteController } from '#root/controller/siteController';

const router = express.Router();

router.get('/api/v1/users', userController.getAllUsers);
router.post('/api/v1/createNewUser', userController.createUserResolver);
router.post('/api/v1/login', userController.userSessionResolver);

router.post('/api/v1/createNewSite', siteController.createSiteResolver);
router.post('/api/v1/getAllSites', siteController.getAllSitesResolver);

export default router;