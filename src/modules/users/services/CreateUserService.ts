

import { getCustomRepository } from 'typeorm'

import { hash } from 'bcryptjs'

import User from '@modules/users/infra/typeorm/entities/User'

import UsersRepository from '../repositories/UsersRepository'

import AppError from '@shared/errors/AppError'


interface Request {
    name: string
    email: string
    password: string
}

class CreateUserService {

    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        /// validations
        if (password.length < 6) {
            throw new AppError('Password must be at least 6 characters')
        }

        const hashedPassword = await hash(password, 8);


        const checkEmailExists = await usersRepository.findOne({
            where: { email: email }
        })

        if (checkEmailExists) {
            throw new AppError('This email is already being used, you can reset the password if you have forgotten')
        }

        const user = usersRepository.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        await usersRepository.save(user);

        return user;
    }

}

export default CreateUserService;