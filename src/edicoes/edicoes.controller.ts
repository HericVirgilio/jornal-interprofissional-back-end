import { Body, Controller, Post, Get, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { EdicoesService } from "./edicoes.service";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";

@Controller('edicoes')
export class EdicoesController{
    
    constructor( private readonly edicoesService: EdicoesService ){}

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
}
