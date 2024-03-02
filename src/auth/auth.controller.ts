import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards , Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.SingIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('cadastro')
    getProfile(@Request() req){
        return req.user;
    }
}