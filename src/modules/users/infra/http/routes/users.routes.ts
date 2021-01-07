//import UsersRepository from '../repositories/UsersRepository';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

//delete
import { getCustomRepository } from 'typeorm'
import UsersRepository from '@modules/users/repositories/UsersRepository';


import CreateUserService from '@modules/users/services/CreateUserService'
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService'
import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthenticated'

const usersRouter = Router();

const upload = multer(uploadConfig)


usersRouter.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const users = await usersRepository.find();
    return response.json({ users })
})

usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password
    });

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    return response.status(200).json(userWithoutPassword)
})

//update one field (patch)
usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    async (request, response) => {
        //console.log(request.file)


        const updateUserAvatar = new updateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.status(200).json(userWithoutPassword)

    })


export default usersRouter;