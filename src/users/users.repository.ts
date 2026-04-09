import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { UpdateUserDto } from './_utils/dto/receive/update-user.dto';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new NotFoundException(`User avec l'id ${id} non trouvé`);
        Object.assign(user, updateUserDto);
        return user.save();

    }

    async findUser(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).select('+password').exec();
        if (!user)
            throw new NotFoundException(`User avec l'email ${email} non trouvé`);
        return user;
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = new this.userModel(userData);
        return user.save();
    }

    async deleteUserById(id: string) {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException(`Impossible de supprimer : ID ${id} inconnu`);
        return result;
    }   
}
