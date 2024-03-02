import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { NoticiasService } from "./noticias.service";
import { CriaNoticiasDto } from "src/dto/create-noticias.dto";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('noticias')
export class NoticiasController{

    constructor(private readonly noticiasService: NoticiasService){}

    @Post('post')
    @UseInterceptors(FileInterceptor('images'))
    async CriaNoticias(@Body() createNoticias: CriaNoticiasDto, @UploadedFile() imagem:Express.Multer.File): Promise<NoticiasEntity>{
        return this.noticiasService.createNoticias(createNoticias, imagem);
    }

    @Get()
    async GetAllNoticias() : Promise<NoticiasEntity[]>{
        return this.noticiasService.getAllNoticias();
    }

}