import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constantes';

@Module({
    imports: [UsersModule,
    JwtModule.register({
        global:true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '120s'},
    })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{};