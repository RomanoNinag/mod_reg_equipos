import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";


import { Marca } from "src/articulo-general-references/marca/entities/marca.entity";
import { Modelo } from "src/articulo-general-references/modelo/entities/modelo.entity";
import { EstadoLogico } from "src/articulo-general-references/estado-logico/entities/estado-logico.entity";
import { EstadoFisico } from "src/articulo-general-references/estado-fisico/entities/estado-fisico.entity";
import { TipoArticulo } from "src/articulo-general-references/tipo-articulo/entities/tipo-articulo.entity";

@Entity('articulosGeneral')
export class ArticuloGeneral extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id_articulo: string;

    @Column('date', {

    })
    fecha_registro: Date;

    @Column('text', {
        nullable: true
    })
    procedencia: string;

    @Column('text', {
        nullable: true
    })
    industria: string;

    @Column('bool', {
        default: false
    })
    asignado: boolean;
    //references


    @ManyToOne(
        () => Marca,
        { eager: true }
    )
    @JoinColumn({ name: "id_marca" })
    marca: Marca;

    @ManyToOne(
        () => Modelo,
        { eager: true }
    )
    @JoinColumn({ name: "id_modelo" })
    modelo: Modelo;

    @ManyToOne(
        () => EstadoLogico,
        { eager: true }
    )
    @JoinColumn({ name: "id_estado_logico" })
    estado_logico: EstadoLogico;

    @ManyToOne(
        () => EstadoFisico,
        { eager: true }
    )
    @JoinColumn({ name: 'id_estado_fisico' })
    estado_fisico: EstadoFisico;

    @ManyToOne(
        () => TipoArticulo,
        { eager: true }
    )
    @JoinColumn({ name: 'id_tipo_articulo' })
    tipo_articulo: TipoArticulo;
}
