import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signInDto } from './dto/auth.login-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signIn(signInDto: signInDto): Promise<any> {
        const user = await this.usersService.findByEmail(signInDto.email);
        const hashedPassword = await this.usersService.hash(signInDto.password);
        if (!user || hashedPassword !== user.password) {
            throw new UnauthorizedException();
        }

        return result;
    }
}
