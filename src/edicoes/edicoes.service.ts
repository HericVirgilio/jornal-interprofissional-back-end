import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileDto } from "src/dto/file.dto";
import { EdicoesEntity } from "src/entity/edicoes.entity";
import { Repository } from "typeorm";
import * as fs from 'fs-extra';
import { FileCreateDto } from "src/dto/create-edicoes.dto";

@Injectable()
export class EdicoesService{

    constructor(
        @InjectRepository(EdicoesEntity)
        private readonly edicoesRepository: Repository<EdicoesEntity>
    ){}

    async NovaEdicao(titulo: string, imagem: Express.Multer.File, pdf: Express.Multer.File){   
        try{    
            
            await fs.ensureDir(`/home/heric/Developer/jornal-interprofissional-back-end/pdf`)
            
            await fs.ensureDir(`/home/heric/Developer/jornal-interprofissional-back-end/images`)

            const enderecoPdf = `/home/heric/Developer/jornal-interprofissional-back-end/pdf/${pdf.originalname}`

            const enderecoImagem = `/home/heric/Developer/jornal-interprofissional-back-end/images/${imagem.originalname}`

            await fs.writeFile(enderecoPdf,pdf.buffer)

            await fs.writeFile(enderecoImagem, imagem.buffer)

            const caminhoImagem = `images/${imagem.originalname}`

            const caminhoPdf = `pdf/${pdf.originalname}`

            const edicoes = new  EdicoesEntity()

            edicoes.titulo = titulo;
            edicoes.data = new Date();
            edicoes.imagemAdress = caminhoImagem;
            edicoes.pdfAdress = caminhoPdf;
            
            this.edicoesRepository.save(edicoes)

            return ("Funcionou")

        }catch(error){
            console.log('============ Erro ao salvar notícia ===============', error)
            throw error; 
        }

    }

    async Edicoes():Promise<any>{
        return this.edicoesRepository.find()
    }
}