import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    keyframes
} from '@angular/animations';

export const ani = [
    trigger('enterAnimation', [
        transition('void => *', [
            style({ width: 100 }),
            animate('1s ease', style({
                width: 588,
            })),
        ]),
        transition('* => void', [
            animate('1s ease', style({
                width: 0
            })),
        ])
    ]),
    /**
     * 
     */
    trigger('trigger1', [
        state('abc', style({ transform: 'scale(1)' })),
        state('def', style({ transform: 'scale(2)' })),
        transition('abc => def', animate('80ms ease-in')),
        transition('def => abc', animate('80ms ease-in')),
    ])
]