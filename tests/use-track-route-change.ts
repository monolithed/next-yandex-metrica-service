import {renderHook} from '@testing-library/react';

import {YandexMetricaEvents,} from '@/events';
import {useTrackRouteChange} from '@/use-track-route-change';
import {YANDEX_METRICA_NAMESPACE} from '@/namespace';

import * as ym from '@/ym';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
    usePathname: () => mockUsePathname()
}));

const WINDOW_YM_MOCK = jest.fn();

const TAG_ID = 444;

describe('useTrackRouteChange (next/navigation)', () => {
    let spyOnYmHelper: jest.SpyInstance;

    const setLocation = (path: string) => {
        window.history.pushState({}, '', path);
    };

    beforeEach(() => {
        WINDOW_YM_MOCK.mockClear();
        mockUsePathname.mockClear();

        spyOnYmHelper = jest.spyOn(ym, 'ym');

        window[YANDEX_METRICA_NAMESPACE] = WINDOW_YM_MOCK;

        setLocation('/initial-path');
    });

    afterEach(() => {
        window[YANDEX_METRICA_NAMESPACE] = undefined;

        spyOnYmHelper.mockRestore();
    });

    it('handles initial route and subsequent changes', () => {
        mockUsePathname.mockReturnValue('/initial-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(1);
        expect(spyOnYmHelper).toHaveBeenCalledWith(
            TAG_ID,
            YandexMetricaEvents.HIT,
            'http://localhost/initial-path'
        );

        expect(WINDOW_YM_MOCK).toHaveBeenCalledTimes(1);

        expect(WINDOW_YM_MOCK).toHaveBeenCalledWith(
            TAG_ID,
            YandexMetricaEvents.HIT,
            'http://localhost/initial-path'
        );

        setLocation('/new-path');
        mockUsePathname.mockReturnValue('/new-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(2);

        expect(spyOnYmHelper).toHaveBeenCalledWith(
            TAG_ID,
            YandexMetricaEvents.HIT,
            'http://localhost/new-path'
        );

        expect(WINDOW_YM_MOCK).toHaveBeenCalledTimes(2);

        expect(WINDOW_YM_MOCK).toHaveBeenCalledWith(
            TAG_ID,
            YandexMetricaEvents.HIT,
            'http://localhost/new-path'
        );
    });

    it('does not track if tagID is null', () => {
        setLocation('/some-path');
        mockUsePathname.mockReturnValue('/some-path');

        renderHook(() => useTrackRouteChange({tagID: null}));

        expect(spyOnYmHelper).not.toHaveBeenCalled();
        expect(WINDOW_YM_MOCK).not.toHaveBeenCalled();
    });

    it('does not track if ym is not available', () => {
        window[YANDEX_METRICA_NAMESPACE] = undefined;

        setLocation('/some-path');
        mockUsePathname.mockReturnValue('/some-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(1);
        expect(spyOnYmHelper).toHaveBeenCalledWith(
            TAG_ID,
            YandexMetricaEvents.HIT,
            'http://localhost/some-path'
        );

        expect(WINDOW_YM_MOCK).not.toHaveBeenCalled();
    });
});
