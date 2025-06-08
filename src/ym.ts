import type {YandexMetricaEventParameters} from '@/events';

const ym = <T extends YandexMetricaEventParameters>(tagID: number, ...params: T): void => {
    if (!tagID) {
        return void 0;
    }

    window.ym?.(tagID, ...params);
}

export {ym};
