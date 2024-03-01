import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn('rowid')
    id: number;
   
    @Column({name: 'nome', nullable: false, unique: true})
    nome: string;

    @Column({name: 'senha', nullable: false})
    senha: string;
}