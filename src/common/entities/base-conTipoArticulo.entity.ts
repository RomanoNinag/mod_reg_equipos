import { Column, Entity } from "typeorm";

@Entity('tipos')
export class BaseEntityTipo {
    // @Column('text', {
    //     unique: true
    // })
    // nombre_tipo: string;

    @Column('int', {
        unique: true,

    })
    tipo: number;
}