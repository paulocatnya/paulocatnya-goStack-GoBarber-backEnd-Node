
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.get('/', async (request, response) => {
    return response.json({message:'apenas para fins de teste'})
})

sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
    console.log('Logou:',userWithoutPassword.email)
    return response.status(200).json({ user:userWithoutPassword, token })
})

export default sessionsRouter;