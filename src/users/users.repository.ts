import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './_utils/dto/receive/update-user.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new NotFoundException(`User avec l'id ${id} non trouvé`);
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async findUser(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        return this.prisma.user.create({
            data: {
                username: userData.username!,
                email: userData.email!,
                password: userData.password!,
                role: userData.role ?? 'user',
            },
        });
    }

    async deleteUserById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new NotFoundException(`Impossible de supprimer : ID ${id} inconnu`);
        return this.prisma.user.delete({ where: { id } });
    }
}
