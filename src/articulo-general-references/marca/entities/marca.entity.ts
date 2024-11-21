import { BaseEntity } from "src/common/entities/base.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('marcas')
export class Marca extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_marca: number;

    @Column('text', {
        unique: true
    })
    nombre_marca: string;

    @Column('int', {

    })
    tipo: number;
}
