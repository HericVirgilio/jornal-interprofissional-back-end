import { Body, Controller, Post, Get, UploadedFiles, UseInterceptors, UseGuards, Param, Delete } from "@nestjs/common";
import { EdicoesService } from "./edicoes.service";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('edicoes')
export class EdicoesController{
    
    constructor( private readonly edicoesService: EdicoesService ){}

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imagem', maxCount: 1},
        { name: 'pdf', maxCount: 1}
    ]))
    async CriaEdicao(@Body('titulo') titulo:string, @UploadedFiles() files: { imagem: Express.Multer.File[], pdf: Express.Multer.File[] }){
       await this.edicoesService.NovaEdicao(titulo, files.imagem[0], files.pdf[0])
    }
    @Get()
    async Edcioes():Promise<any>{
        const edicoes = await this.edicoesService.Edicoes()

        const edicoesImagens = edicoes.map(edicoes => ({
            ...edicoes,
            imagemAddress: `http://localhost:8080/${edicoes.imagemAdress}`,
            pdfAddress: `http://localhost:8080/${edicoes.pdfAdress}`
        }))
        return edicoesImagens;
    }

    @Delete(':id')
    async deleteEdicao(@Param('id') id: number){
        try{
            const edicao = await this.edicoesService.EncontrarId(id)
            if(!edicao){
                throw new Error('Edição não encontrada');
            }
            await this.edicoesService.deleteFiles(edicao.imagemAdress, edicao.pdfAdress)
            await this.edicoesService.deleteEdicao(id)
            return { message: 'Edição excluída com sucesso' };
        } catch(error){
            throw new Error(`Erro ao excluir edição: ${error.message}`);
        }
    }
}
