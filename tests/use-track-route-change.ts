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
    const originalLocation = window.location;
    let spyOnYmHelper: jest.SpyInstance;

    beforeEach(() => {
        WINDOW_YM_MOCK.mockClear();
        mockUsePathname.mockClear();

        spyOnYmHelper = jest.spyOn(ym, 'ym');

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...originalLocation,
                href: 'http://localhost/initial-path',
                pathname: '/initial-path',
                origin: 'http://localhost',
            },
        });

        Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
            configurable: true,
            value: WINDOW_YM_MOCK,
        });
    });

    afterEach(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation,
        });
        Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
            configurable: true,
            value: undefined,
        });
        spyOnYmHelper.mockRestore();
    });

    it('handles initial route and subsequent changes', () => {
        mockUsePathname.mockReturnValue('/initial-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(1);
        expect(spyOnYmHelper).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.HIT, 'http://localhost/initial-path');

        expect(WINDOW_YM_MOCK).toHaveBeenCalledTimes(1);
        expect(WINDOW_YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.HIT, 'http://localhost/initial-path');


        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...originalLocation,
                href: 'http://localhost/new-path',
                pathname: '/new-path',
                origin: 'http://localhost',
            },
        });
        mockUsePathname.mockReturnValue('/new-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(2);
        expect(spyOnYmHelper).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.HIT, 'http://localhost/new-path');

        expect(WINDOW_YM_MOCK).toHaveBeenCalledTimes(2);
        expect(WINDOW_YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.HIT, 'http://localhost/new-path');
    });

    it('does not track if tagID is null', () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...originalLocation,
                href: 'http://localhost/some-path',
                pathname: '/some-path',
                origin: 'http://localhost',
            },
        });
        mockUsePathname.mockReturnValue('/some-path');

        renderHook(() => useTrackRouteChange({tagID: null}));

        expect(spyOnYmHelper).not.toHaveBeenCalled();

        expect(WINDOW_YM_MOCK).not.toHaveBeenCalled();
    });


    it('does not track if ym is not available', () => {
        Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
            configurable: true,
            value: undefined,
        });

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...originalLocation,
                href: 'http://localhost/some-path',
                pathname: '/some-path',
                origin: 'http://localhost',
            },
        });
        mockUsePathname.mockReturnValue('/some-path');

        renderHook(() => useTrackRouteChange({tagID: TAG_ID}));

        expect(spyOnYmHelper).toHaveBeenCalledTimes(1);
        expect(spyOnYmHelper).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.HIT, 'http://localhost/some-path');

        expect(WINDOW_YM_MOCK).not.toHaveBeenCalled();
    });
});
