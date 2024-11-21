import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tiposArticulos')
export class TipoArticulo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_articulo: number;

    @Column('text', {
        unique: true,
    })
    nombre_tipo_articulo: string;
    @Column('int', {

    })
    tipo: number;
}