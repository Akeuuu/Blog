import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}