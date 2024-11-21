import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estadosLogicos')
export class EstadoLogico extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_estado_logico: number;

    @Column('text', {
        unique: true,
    })
    nombre_estado_logico: string;
    
    @Column('text', {
        nullable: true
    })
    descripcion_estado_fisico: string;

    @Column('int', {

    })
    tipo: number;
}
