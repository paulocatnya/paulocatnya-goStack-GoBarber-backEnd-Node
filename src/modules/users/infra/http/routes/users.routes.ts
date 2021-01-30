import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthenticated'
import UsersControllers from '../controllers/UsersControllers'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router();
const usersControllers = new UsersControllers()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersControllers.create);


usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    userAvatarController.update,
);


export default usersRouter;