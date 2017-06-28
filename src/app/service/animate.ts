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
        transition('* => void', [
            animate('700ms ease', style({
                opacity: 0
            })),
        ])
    ]),

    trigger('enterAnimation1', [
        transition('void => *', [
            style({ opacity: 0 }),
            animate('500ms 500ms ease', style({
                opacity: 1,
            })),
        ]),
    ]),


    trigger('plusAnimation', [
        transition('void => *', [
            style({ opacity: 0, 'margin-left': -65 }),
            animate('500ms 500ms ease', style({
                opacity: 1
            })),
        ])
    ])
    // tslint:disable-next-line:eofline
];