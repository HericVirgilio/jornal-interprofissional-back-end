import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriaNoticiasDto } from "src/dto/noticias.dto";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { Repository } from "typeorm";

@Injectable()
export class NoticiasService{
    
    constructor(
        @InjectRepository(NoticiasEntity)
        private readonly noticiasRepository: Repository<NoticiasEntity>){}
    
}