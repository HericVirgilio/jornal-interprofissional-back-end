import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { UsersController } from "./users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers:[UserService],
    exports:[UserService],
})
export class UsersModule{};