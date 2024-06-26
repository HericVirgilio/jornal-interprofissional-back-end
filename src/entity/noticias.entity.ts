import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'noticias' })
export class NoticiasEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: "titulo", nullable: false })
    titulo: string;
    
    @Column({ name: "subtitulo", nullable: false })
    subtitulo: string;

    @Column({ name: "imagemAddress", nullable: false })
    imagemAddress: string;

    @Column({ name: "texto", nullable: false, type: 'text' })
    texto: string;

    @Column({ name: "Data", nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data: Date;
}
