export class FileCreateDto {
    titulo: string;
    imagem: Express.Multer.File;
    pdf: Express.Multer.File;
}