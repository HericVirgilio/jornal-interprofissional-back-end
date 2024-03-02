import { Module } from "@nestjs/common";
import { NoticiasController } from "./noticias.controller";
import { NoticiasService } from "./noticias.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoticiasEntity } from "src/entity/noticias.entity";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from 'multer';

@Module({
    imports: [
        TypeOrmModule.forFeature([NoticiasEntity]),
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './images',
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        cb(null, file.fieldname + '-' + uniqueSuffix)
                    }
                })
            })
        })
    ],
    controllers: [NoticiasController],
    providers: [NoticiasService],
}) 
export class NoticiasModule{}
