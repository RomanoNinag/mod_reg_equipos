import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('modelos')
export class Modelo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_modelo: number;

    @Column('text', {
        unique: true

    })
    nombre_modelo: string;

    @Column('int', {
        nullable: true
    })
    tipo: number;
}
