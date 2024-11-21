import { ArticuloGeneral } from "src/articulo-general/entities";
import { Column, Entity } from "typeorm";

@Entity()
export class Equipo extends ArticuloGeneral {
    @Column('text', {
        unique: true
    })
    cod_registro: string;
}
