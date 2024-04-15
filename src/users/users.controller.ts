import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UserEntity } from "src/entity/user.entity";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users")
export class UsersController{
    
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard)
    @Post()
    async CreateUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async GetAllUsers(): Promise<UserEntity[]>{
        return this.userService.getAllUsers()
    }   
}