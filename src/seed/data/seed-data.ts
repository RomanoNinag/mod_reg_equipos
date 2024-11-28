interface SeedMarca {
    nombre_marca: string;
    tipo: number;
}

interface SeedModelo {
    nombre_modelo: string;
    tipo: number;
}

interface SeedEstadoFisico {
    nombre_estado_fisico: string;
    descripcion_estado_fisico: string;
    tipo: number;
}

interface SeedEstadoLogico {
    nombre_estado_logico: string;
    descripcion_estado_logico: string;
    tipo: number;
}

interface SeedTipoArticulo {
    nombre_tipo_articulo: string;
    tipo: number;
}

interface SeedArma {
    tipo: string;
    nombre_modelo: string;
    calibre: string;
    capacidad_cargador: number;
    capacidad_tambor: number;
    cargador: string;
    acabado: string;
}

// intermedio de poner tipo de datos para el initial data
interface SeedData {
    marcas: SeedMarca[];
    modelos: SeedModelo[];
    estadosFisicos: SeedEstadoFisico[];
    estadosLogicos: SeedEstadoLogico[];
    tiposArticulo: SeedTipoArticulo[];
    armas?: SeedArma[];
}

export const initialData: SeedData = {
    marcas: [
        { nombre_marca: 'BROWNING', tipo: 1 },
        { nombre_marca: 'BERETTA', tipo: 1 },
        { nombre_marca: 'CZ', tipo: 1 },
        { nombre_marca: 'SIG SAUER', tipo: 1 },
        { nombre_marca: 'Safariland', tipo: 2 },
        { nombre_marca: 'Honeywell', tipo: 2 },
        { nombre_marca: 'Point Blank Enterprises', tipo: 2 },
        { nombre_marca: 'Ballistic', tipo: 2 },
        { nombre_marca: 'MSA Safety', tipo: 2 },
        { nombre_marca: 'Under Armour', tipo: 2 },
    ],
    modelos: [
        { nombre_modelo: '201', tipo: 1 },
        { nombre_modelo: '203', tipo: 1 },
        { nombre_modelo: '276', tipo: 1 },
        { nombre_modelo: 'TL1', tipo: 1 },
        { nombre_modelo: 'L 5', tipo: 1 },
        { nombre_modelo: 'GAS GUN', tipo: 1 },
        { nombre_modelo: 'FM', tipo: 1 },
        { nombre_modelo: 'ProTec 5000', tipo: 2 },
        { nombre_modelo: 'BulletSafe V2', tipo: 2 },
        { nombre_modelo: 'Safariland 6280', tipo: 2 },
        { nombre_modelo: 'MSA V-Gard 500', tipo: 2 },
        { nombre_modelo: 'Point Blank MC Armor', tipo: 2 },
        { nombre_modelo: 'T-REX Molle Plate Carrier', tipo: 2 },
        { nombre_modelo: 'Under Armour Tactical', tipo: 2 },
    ],
    estadosFisicos: [
        { nombre_estado_fisico: 'CAÑON Y ARMAZON', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CAÑON Y ARMAZON SIN MANIVELA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CAÑON Y ARMAZON CON MANIVELA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'MADERAMEN RAJADO', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CACHA ROTA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'SIN CACHA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CLISADO', descripcion_estado_fisico: '', tipo: 2 },
        { nombre_estado_fisico: 'ROTO', descripcion_estado_fisico: '', tipo: 2 },
        { nombre_estado_fisico: 'DETERIORADO', descripcion_estado_fisico: '', tipo: 2 },
    ],
    estadosLogicos: [
        { nombre_estado_logico: 'EN BUEN ESTADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'EN MAL ESTADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'EN REGULAR ESTADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'EXTRAVIADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'HURTADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'SUSTRAIDO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'ROBADO', descripcion_estado_logico: '', tipo: 3 },
        { nombre_estado_logico: 'SINIESTRADO', descripcion_estado_logico: '', tipo: 3 },

    ],
    tiposArticulo: [
        { nombre_tipo_articulo: 'FUSIL', tipo: 1 },
        { nombre_tipo_articulo: 'SUBFUSIL', tipo: 1 },
        { nombre_tipo_articulo: 'SUBAMETRALLADORA', tipo: 1 },
        { nombre_tipo_articulo: 'PISTOLA', tipo: 1 },
        { nombre_tipo_articulo: 'CARABINA', tipo: 1 },
        { nombre_tipo_articulo: 'METRALLETA', tipo: 1 },
        { nombre_tipo_articulo: 'ESCOPETA', tipo: 1 },
        { nombre_tipo_articulo: 'REVOLVER', tipo: 1 },
        { nombre_tipo_articulo: 'CASCO', tipo: 2 },
        { nombre_tipo_articulo: 'ESCUDO', tipo: 2 },
        { nombre_tipo_articulo: 'CHALECO ANTIBALAS', tipo: 2 },
    ],
    armas: [
        {
            tipo: 'Pistola',
            nombre_modelo: 'Glock 17',
            calibre: '9mm',
            capacidad_cargador: 17,
            capacidad_tambor: 0,
            cargador: 'Estándar',
            acabado: 'Negro',
        },
        {
            tipo: 'Rifle',
            nombre_modelo: 'AK-47',
            calibre: '7.62mm',
            capacidad_cargador: 30,
            capacidad_tambor: 0,
            cargador: 'Estándar',
            acabado: 'Madera',
        },
    ]
};