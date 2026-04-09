import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findUser(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).select('+password').exec();
        return user;
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = new this.userModel(userData);
        return user.save();
    }
}