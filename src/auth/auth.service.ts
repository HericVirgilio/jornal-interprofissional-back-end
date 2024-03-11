import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async SingIn(username: string, pass: string): Promise<{access_token: string}> {
        const user = await this.usersService.BuscaUsuario(username);

        console.log("Estou no service")

        if (!user || !(await bcrypt.compare(pass, user.senha))) {
            console.log("deu errado")
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.nome };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
