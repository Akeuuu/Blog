import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './_utils/dto/receive/create-user.dto';
import { UpdateUserDto } from './_utils/dto/receive/update-user.dto';
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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const userData = { ...createUserDto, password: hashedPassword };
        return this.userRepository.createUser(userData);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.updateById(id, updateUserDto);
    }

    async deleteUser(id: string): Promise<User> {
        return this.userRepository.deleteUserById(id);
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}