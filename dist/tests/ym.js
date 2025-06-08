import { YandexMetricaEvents, } from '@/events';
import { YANDEX_METRICA_NAMESPACE } from '@/namespace';
import { ym } from '@/ym';
const YM_MOCK = jest.fn();
const DEFAULT_GOAL = 'goal';
const TAG_ID = 444;
Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
    value: YM_MOCK,
    writable: true
});
describe('ym', () => {
    it('calls ym with provided parameters', () => {
        ym(TAG_ID, YandexMetricaEvents.HIT, '/url');
        ym(TAG_ID, YandexMetricaEvents.REACH_GOAL, DEFAULT_GOAL);
        expect(YM_MOCK).toHaveBeenCalledTimes(2);
        expect(YM_MOCK).toHaveBeenNthCalledWith(1, TAG_ID, YandexMetricaEvents.HIT, '/url');
        expect(YM_MOCK).toHaveBeenNthCalledWith(2, TAG_ID, YandexMetricaEvents.REACH_GOAL, DEFAULT_GOAL);
    });
    it('does not call ym if tagID is not provided', () => {
        ym(null, YandexMetricaEvents.HIT, '/url');
        ym(null, YandexMetricaEvents.REACH_GOAL, DEFAULT_GOAL);
        expect(YM_MOCK).not.toHaveBeenCalled();
    });
    it('does not call ym if ym is not defined', () => {
        Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
            value: undefined,
            writable: true,
        });
        ym(TAG_ID, YandexMetricaEvents.HIT, '/url');
        ym(TAG_ID, YandexMetricaEvents.REACH_GOAL, DEFAULT_GOAL);
        expect(YM_MOCK).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=ym.js.map