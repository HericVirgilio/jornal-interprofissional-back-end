import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards , Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        return this.authService.SingIn(loginDto.nome, loginDto.senha);
    }

    @UseGuards(AuthGuard)
    @Get('cadastro')
    getProfile(@Request() req){
        return req.user;
    }
}