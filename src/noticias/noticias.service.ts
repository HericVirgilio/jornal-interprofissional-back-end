import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriaNoticiasDto } from "src/dto/create-noticias.dto";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { Repository } from "typeorm";
import * as path from 'path';
import * as fs from 'fs';
import { Express } from "express";

@Injectable()
export class NoticiasService {

    constructor(
        @InjectRepository(NoticiasEntity)
        private readonly noticiasEntity: Repository<NoticiasEntity>
    ) { }

    async createNoticias(createNoticias: CriaNoticiasDto, imagem: Express.Multer.File): Promise<NoticiasEntity> {

        const nomeArquivo = imagem.filename;
        const enderecoDestino = path.join(__dirname, '..', '..', 'images', nomeArquivo);
        fs.writeFileSync(enderecoDestino, imagem.buffer);

        const noticia = this.noticiasEntity.create({
            ...createNoticias,
            imagem: `/images/${nomeArquivo}`,
            data: new Date()
        });

        return this.noticiasEntity.save(noticia);
    }

    async getAllNoticias(): Promise<NoticiasEntity[]> {
        return this.noticiasEntity.find();
    }
}
