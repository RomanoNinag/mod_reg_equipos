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
        { nombre_marca: 'Marca A', tipo: 1 },
        { nombre_marca: 'Marca B', tipo: 2 },
        { nombre_marca: 'Marca C', tipo: 3 },
        { nombre_marca: 'Marca D', tipo: 1 },
    ],
    modelos: [
        { nombre_modelo: 'Modelo 1', tipo: 1 },
        { nombre_modelo: 'Modelo 2', tipo: 1 },
        { nombre_modelo: 'Modelo 3', tipo: 1 },
    ],
    estadosFisicos: [
        { nombre_estado_fisico: 'CAÑON Y ARMAZON', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CAÑON Y ARMAZON SIN MANIVELA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CAÑON Y ARMAZON CON MANIVELA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'MADERAMEN RAJADO', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'CACHA ROTA', descripcion_estado_fisico: '', tipo: 1 },
        { nombre_estado_fisico: 'SIN CACHA', descripcion_estado_fisico: '', tipo: 1 },
    ],
    estadosLogicos: [
        { nombre_estado_logico: 'EN BUEN ESTADO', descripcion_estado_logico: '', tipo: 1 },
        { nombre_estado_logico: 'EN MAL ESTADO', descripcion_estado_logico: '', tipo: 1 },
        { nombre_estado_logico: 'EN REGULAR ESTADO', descripcion_estado_logico: '', tipo: 1 },
        { nombre_estado_logico: 'EXTRAVIADO', descripcion_estado_logico: '', tipo: 1 },
        { nombre_estado_logico: 'HURTADO', descripcion_estado_logico: '', tipo: 1 },

    ],
    tiposArticulo: [
        { nombre_tipo_articulo: 'FUSIL', tipo: 1 },
        { nombre_tipo_articulo: 'SUBFUSIL', tipo: 1 },
        { nombre_tipo_articulo: 'SUBAMETRALLADORA', tipo: 1 },
        { nombre_tipo_articulo: 'PISTOLA', tipo: 1 },
        { nombre_tipo_articulo: 'CARABINA', tipo: 1 },
        { nombre_tipo_articulo: 'MATRALLETA', tipo: 1 },
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