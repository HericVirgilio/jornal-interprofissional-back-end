import { Module } from "@nestjs/common";
import { NoticiasController } from "./noticias.controller";
import { NoticiasService } from "./noticias.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoticiasEntity } from "src/entity/noticias.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NoticiasEntity])],
    controllers: [NoticiasController],
    providers: [NoticiasService]
})export class NoticiasModule{}