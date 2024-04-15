import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EdicoesEntity } from "src/entity/edicoes.entity";
import { EdicoesController } from "./edicoes.controller";
import { EdicoesService } from "./edicoes.service";

@Module({
    imports:[TypeOrmModule.forFeature([EdicoesEntity])],
    controllers:[EdicoesController],
    providers:[EdicoesService],
})export class EdicoesModule{}