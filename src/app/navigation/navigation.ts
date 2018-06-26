import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Secciones',
        type: 'group',
        children: [
            {
                id: 'panel',
                title: 'Panel',
                type: 'item',
                icon: 'view_quilt',
                url: '/panel'
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id: 'regression',
                title: 'Estimaciones',
                type: 'item',
                icon: 'timeline',
                url: '/regression'
            },
            {
                id: 'chart',
                title: 'Generar Gráficas',
                type: 'item',
                icon: 'bar_chart',
                url: '/generator-chart'
            },
            {
                id: 'chart-save',
                title: 'Gráficas Guardadas',
                type: 'item',
                icon: 'save',
                url: '/save-chart'
            },
            {
                id: 'tables',
                title: 'TensorFlow',
                type: 'item',
                icon: 'view_headline',
                url: '/ts-test'
            },
            {
                id: 'tables',
                title: 'Tablas',
                type: 'item',
                icon: 'view_headline',
                url: '/list-tables'
            }
        ]
    }
];
