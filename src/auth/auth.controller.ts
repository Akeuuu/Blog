import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() signInDto: AuthPayloadDto){
        this.authService.signIn(signInDto);
    }
}
