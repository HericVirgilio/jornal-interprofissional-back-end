import { UserEntity } from "src/entity/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";

@Injectable()
export class UserService{

    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
   
    async createUser(createUser: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUser.senha, saltOrRounds);

        return this.userRepository.save({
            ...createUser,
            senha: passwordHashed,
        }); 
    }
    
    async getAllUsers(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    async BuscaUsuario(userName: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { nome: userName } });
    }
}
