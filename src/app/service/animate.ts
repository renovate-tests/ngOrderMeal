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
            style({ width: 0 }),
            animate('500ms ease', style({
                width: 388,
            })),
        ]),
    ]),

    trigger('enterAnimation1', [
        transition('void => *', [
            style({ opacity: 0 }),
            animate('500ms 500ms ease', style({
                opacity: 1,
            })),
        ]),
    ]),
    
    trigger('outerAnimation', [
        transition('* => void', [
            animate('700ms ease', style({
                opacity: 0
            })),
        ])
    ]),

    trigger('plusAnimation', [
        transition('void => *', [
            style({ opacity: 0 }),
            animate('500ms ease', style({
                opacity: 1
            })),
        ]),
        // transition('* => void', [
        //     style({ opacity: 1, 'margin-top': -165 }),
        //     animate('500ms 500ms ease', style({
        //         opacity: 0
        //     })),
        // ])
    ])
    // tslint:disable-next-line:eofline
];