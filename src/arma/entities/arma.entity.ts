import { ArticuloGeneral } from "src/articulo-general/entities/articulo-general.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('armas')
export class Arma extends ArticuloGeneral {
    @Column('text', {
        unique: true,
    })
    serie: string;

    @Column('text', {
        nullable: true,
    })
    calibre: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    nro_cargador: number;
    @Column('int', {
        default: 0,
    })
    capacidad_cargador: number;

    @Column('int', {
        default: 0,
    })
    capacidad_tambor: number;

    @Column('text', {
        nullable: true,
    })
    acabado: string;

}
