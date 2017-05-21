export class Method {
    static PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    public static GetFirebaseKeyTime(id): Date {
        id = id.substring(0, 8);
        let timestamp = 0;
        for (let i = 0; i < id.length; i++) {
            const c = id.charAt(i);
            timestamp = timestamp * 64 + Method.PUSH_CHARS.indexOf(c);
        }
        return new Date(timestamp);
    }
}


