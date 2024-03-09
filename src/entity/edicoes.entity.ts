import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'edicoes'})
export class EdicoesEntity{

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: "titulo", nullable: false})
    titulo: string;

    @Column({ name: "imagemAdress", nullable: false})
    imagemAdress: string;

    @Column({ name: "pdfAdress", nullable: false})
    pdfAdress: string;

    @Column({ name: "Data", nullable: false, type: "timestamp"})
    data: Date;
}