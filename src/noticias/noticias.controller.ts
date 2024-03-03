import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { FileDto } from "src/dto/file.dto";
import { CriaNoticiasDto } from "src/dto/create-noticias.dto";
import { NoticiasService } from "./noticias.service";

@Controller('noticias')
export class NoticiasController{

    constructor(
        private readonly noticiasService: NoticiasService
    ){}

    @Post('cria-noticia')
    @UseInterceptors(FileInterceptor('file'))
    async CriaNoticias(@Body() criaNoticias: CriaNoticiasDto,@UploadedFile() file: FileDto) :Promise<NoticiasEntity>{
        try {
            const caminhoBD = await this.noticiasService.SalvaImagem(file);
            const noticia = await this.noticiasService.SalvarNoticia(criaNoticias, caminhoBD);
            return noticia;
        } catch (error) {
            console.error('Erro ao criar notícia:', error);
            throw error; // ou retorne uma mensagem de erro apropriada
        }
    }

    @Get()
    async GetAllNoticias():Promise<any>{
        const noticias = await this.noticiasService.GetNoticias();
        // Mapeie cada notícia para incluir o endereço da imagem
        const noticiasComImagens = noticias.map(noticia => ({
            ...noticia,
            imagemAddress: `http://localhost:8080/${noticia.imagemAddress}`
        }));
        return noticiasComImagens;
    }
}