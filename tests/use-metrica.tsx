import type React from 'react';
import {renderHook} from '@testing-library/react';

import {MetricaTagIDContext,} from '@/provider';
import {useYandexMetrica} from '@/use-metrica';
import {YANDEX_METRICA_NAMESPACE} from '@/namespace';

import {
    type ExtLinkEventParameters,
    YandexMetricaEvents
} from '@/events';


const YM_MOCK = jest.fn();
const TAG_ID = 444;

Object.defineProperty(window, YANDEX_METRICA_NAMESPACE, {
    value: YM_MOCK,
    writable: true,
});

type Props = React.PropsWithChildren;

const Providers: React.FunctionComponent<Props> = ({children}) => (
    <MetricaTagIDContext.Provider value={TAG_ID}>
        {children}
    </MetricaTagIDContext.Provider>
);

describe('useMetrica', () => {
    it('calls ym methods with correct parameters', () => {
        const {result} = renderHook(() => useYandexMetrica(), {wrapper: Providers});

        const {
            notBounce,
            reachGoal,
            setUserID,
            userParams,
            ymEvent
        } = result.current;

        notBounce();

        expect(YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.NOT_BOUNCE, undefined);

        reachGoal('test', {order_price: 999});

        expect(YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.REACH_GOAL, 'test', {
            order_price: 999
        }, undefined);

        setUserID('12345');

        expect(YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.SET_USER_ID, '12345');

        userParams({status: 'Gold', UserID: 12345});

        expect(YM_MOCK).toHaveBeenCalledWith(TAG_ID, YandexMetricaEvents.USER_PARAMS, {
            status: 'Gold',
            UserID: 12345
        });

        ymEvent<ExtLinkEventParameters>(YandexMetricaEvents.EXT_LINK, 'https://example.com/', {
            title: 'Test',
            params: {
                order_price: 999
            }
        });

        expect(YM_MOCK).toHaveBeenCalledWith(444, YandexMetricaEvents.EXT_LINK, 'https://example.com/', {
            title: 'Test',
            params: {
                order_price: 999
            }
        });

        expect(YM_MOCK).toHaveBeenCalledTimes(5);
    });
});
