import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import { compare } from "bcrypt"; 

@Injectable()
export class AuthService{
    constructor(
        private usersService: UserService,
        private jwtService: JwtService){}

    async SingIn(username: string, pass:string): Promise<{access_token: string}>{
        
        const user = await this.usersService.BuscaUsuario(username);

        if (!user || !( await compare(pass, user.senha))) { // Verifica se user é undefined ou se a senha não corresponde
            throw new UnauthorizedException(); // Lança uma exceção de não autorizado
        }
        
        const payload = { sub: user.id, username: user.nome };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

