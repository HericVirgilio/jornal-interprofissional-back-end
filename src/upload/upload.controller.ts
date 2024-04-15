import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDto } from "../dto/file.dto";

@Controller('upload')
export class UploadCOntroller{
    constructor(private readonly uploadService: UploadService){}

    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file:FileDto ){
        console.log("criado")
        console.log(file.buffer)
        this.uploadService.SalvarImg(file)
    }

}