import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UserEntity } from "src/entity/user.entity";

@Controller("users")
export class UsersController{
    
    constructor(private readonly userService: UserService){}


    @Post()
    async CreateUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async GetAllUsers(): Promise<UserEntity[]>{
        return this.userService.getAllUsers()
    }   
}