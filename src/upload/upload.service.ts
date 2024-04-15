import { Injectable } from "@nestjs/common";
import * as fs from 'fs-extra';
import { FileDto } from "../dto/file.dto";


@Injectable()
export class UploadService{

    async SalvarImg(fileDto: FileDto): Promise<FileDto>{
        try{
            await fs.ensureDir('/home/heric/Developer/jornal-interprofissional-back-end/images');

            await fs.writeFile('/home/heric/Developer/jornal-interprofissional-back-end/images/' + fileDto.originalname, fileDto.buffer)
            
            console.log('Dados armazenados com sucesso!')

        } catch(error){
            console.error('Erro ao armaszenar daos' , error)
        }

        return fileDto
    }
}