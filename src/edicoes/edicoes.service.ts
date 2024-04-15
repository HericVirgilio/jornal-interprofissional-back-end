import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EdicoesEntity } from "src/entity/edicoes.entity";
import { Repository } from "typeorm";
import * as fs from 'fs-extra';
import { createHash } from "crypto";


@Injectable()
export class EdicoesService{

    constructor(
        @InjectRepository(EdicoesEntity)
        private readonly edicoesRepository: Repository<EdicoesEntity>
    ){}

    async NovaEdicao(titulo: string, imagem: Express.Multer.File, pdf: Express.Multer.File){   
        try{    
            
            await fs.ensureDir(`/var/lib/docker/volumes/pdf`)

            const hashPdf = createHash('md5').update(pdf.buffer).digest('hex')

            const extensaoPdf = pdf.originalname.split('.').pop();

            const nomePdfHashado =  hashPdf + "." + extensaoPdf
            
            await fs.ensureDir(`/var/lib/docker/volumes/imagens`)

            const hashImagem = createHash('md5').update(imagem.buffer).digest('hex');

            const extensaoImagem = imagem.originalname.split('.').pop();

            const nomeImagemHashado = hashImagem + "." + extensaoImagem

            const enderecoPdf = `/var/lib/docker/volumes/pdf/${nomePdfHashado}`

            const enderecoImagem = `/var/lib/docker/volumes/imagens/${nomeImagemHashado}`

            await fs.writeFile(enderecoPdf,pdf.buffer)

            await fs.writeFile(enderecoImagem, imagem.buffer)

            const caminhoImagem = `images/${nomeImagemHashado}`

            const caminhoPdf = `pdf/${nomePdfHashado}`

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
        return this.edicoesRepository.find({
            order:{
                data: "DESC"
            }
        })
    }

    async EncontrarId(id: number):Promise<EdicoesEntity | undefined> {
        return this.edicoesRepository.findOne({where: {id: id}})
    }

    async deleteFiles(imagemAdress: string, pdfAdress: string): Promise<void> {

        const enderecoPdf = `/var/lib/docker/volumes/${imagemAdress}`

        const enderecoImagem = `/var/lib/docker/volumes/${pdfAdress}`


        try {
            await fs.unlink(enderecoImagem);
            await fs.unlink(enderecoPdf);
        } catch (error) {
            throw new Error(`Erro ao excluir arquivos: ${error.message}`);
        }
    }

    async deleteEdicao(id: number): Promise<void> {
        try {
            await this.edicoesRepository.delete(id);
        } catch (error) {
            throw new Error(`Erro ao excluir edição do banco de dados: ${error.message}`);
        }
    }
}