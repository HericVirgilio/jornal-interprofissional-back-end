import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { CreateUserDto } from "src/dto/user.dto";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository <UserEntity>){}

    async createUser( createUser: CreateUserDto) : Promise<UserEntity>{

        if(createUser.senha !== createUser.senhaDois){
            throw new BadRequestException("As senhas não saão iguais");
        }else{
            const saltOrRounds = 10;
            const passwordHashed = await hash(createUser.senha, saltOrRounds);

            const newUser = this.userRepository.create({
                nome: createUser.nome,
                senha: passwordHashed
            });
            return this.userRepository.save(newUser)
        }
    }

    async getAllUser(){
        return this.userRepository.find()
    }
}