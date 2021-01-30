


import { hash } from 'bcryptjs'

import User from '@modules/users/infra/typeorm/entities/User'

import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'


interface IRequest {
    name: string
    email: string
    password: string
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        /// validations
        if (password.length < 6) {
            throw new AppError('Password must be at least 6 characters')
        }

        const hashedPassword = await hash(password, 8);


        const checkEmailExists = await this.usersRepository.findByEmail(email)

        if (checkEmailExists) {
            throw new AppError('This email is already being used, you can reset the password if you have forgotten')
        }

        const user = await this.usersRepository.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        return user;
    }

}

export default CreateUserService;