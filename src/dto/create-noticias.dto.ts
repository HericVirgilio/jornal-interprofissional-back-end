export interface CriaNoticiasDto{
        titulo: string,
        subtitulo: string,
        texto:string,
        imagem: Express.Multer.File
}