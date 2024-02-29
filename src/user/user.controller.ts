import { Body, Controller, Post,Get } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user.dto";
import { UserService } from "./user.service";
import { UserEntity } from "src/entity/user.entity";
@Controller('cadastro')
export class UserController{

    constructor( private readonly userService: UserService){}

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity>{
        return this.userService.createUser(createUser)
    }   

    @Get()
    async getAllUsers(){
        return this.userService.getAllUser();
    }
}