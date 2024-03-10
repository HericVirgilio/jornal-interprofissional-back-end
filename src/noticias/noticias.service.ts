import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriaNoticiasDto } from "src/dto/create-noticias.dto";
import { FileDto } from "src/dto/file.dto";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { Repository } from "typeorm";
import * as fs from 'fs-extra';
import { createHash } from 'crypto';


@Injectable()
export class NoticiasService {
    constructor(
        @InjectRepository(NoticiasEntity)
        private readonly noticiasRepository: Repository<NoticiasEntity>
    ) { }


    async SalvaImagem(file: FileDto):
        Promise<string> {
        try {
            await fs.ensureDir('/home/heric/Developer/jornal-interprofissional-back-end/images')


            const hash = createHash('md5').update(file.buffer).digest('hex');

            const extensao = file.originalname.split('.').pop();

            const nomeHashado = hash + "." + extensao;

            const enderecoImagem: string = '/home/heric/Developer/jornal-interprofissional-back-end/images/' + nomeHashado;

            await fs.writeFile(enderecoImagem, file.buffer)

            const caminhoBD = `images/${nomeHashado}`

            return caminhoBD
        } catch (error) {
            console.log('============ Erro ao armazenar aquivo ===============', error)
        }
    }

    async SalvarNoticia(criaNoticias: CriaNoticiasDto, enderecoImagem:string): Promise<NoticiasEntity> {
        try {

            const noticia = new NoticiasEntity()

            noticia.titulo = criaNoticias.titulo
            noticia.subtitulo = criaNoticias.subtitulo 
            noticia.texto = criaNoticias.texto
            noticia.data = new Date()
            noticia.imagemAddress = enderecoImagem

            return await this.noticiasRepository.save(noticia)
        } catch(error) {
            console.log('============ Erro ao salvar notícia ===============', error)
            throw error; 
        }
    }

    async GetNoticias(): Promise<any>{
        return this.noticiasRepository.find({
            order:{
                data: "DESC"
            }
        });
    }  
}