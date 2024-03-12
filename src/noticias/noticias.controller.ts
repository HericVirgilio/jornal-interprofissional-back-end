import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { FileDto } from "src/dto/file.dto";
import { CriaNoticiasDto } from "src/dto/create-noticias.dto";
import { NoticiasService } from "./noticias.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('noticias')
export class NoticiasController{

    constructor(
        private readonly noticiasService: NoticiasService
    ){}

    @UseGuards(AuthGuard)
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

    @Delete(':id')
    async deleteNoticia(@Param('id') id: number) {
        console.log("estou no controller")
        try {
            console.log("estou no try")
            const noticia = await this.noticiasService.EncontrarId(id);
            if (!noticia) {
                throw new Error('Notícia não encontrada');
            }
            await this.noticiasService.deleteFiles(noticia.imagemAddress);
            await this.noticiasService.deleteNoticia(id);
            return { message: 'Notícia excluída com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao excluir notícia: ${error.message}`);
        }
    }
}