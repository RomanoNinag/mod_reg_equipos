import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estadosFisicos')
export class EstadoFisico extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_estado_fisico: number;

    @Column('text', {
        unique: true,
    })
    nombre_estado_fisico: string;

    @Column('text',{
        nullable: true
    })
    descripcion_estado_fisico: string;
    
    @Column('int', {

    })
    tipo: number;
}