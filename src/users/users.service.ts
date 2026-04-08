import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}
    
    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findUser(email);
    }

    async hash(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }
}