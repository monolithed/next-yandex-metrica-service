export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_YANDEX_METRICA_ID: string;
        }
    }

    interface Window {
        ym?: (tagID: number, ...args: any[]) => void;
    }
}
