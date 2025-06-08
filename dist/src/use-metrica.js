import { useCallback, useContext } from 'react';
import { MetricaTagIDContext } from './provider';
import { YandexMetricaEvents } from './events';
import { ym } from './ym';
const useYandexMetrica = () => {
    const tagID = useContext(MetricaTagIDContext);
    const notBounce = useCallback((options) => {
        ym(tagID, YandexMetricaEvents.NOT_BOUNCE, options);
    }, [tagID]);
    const reachGoal = useCallback((target, params, callback) => {
        ym(tagID, YandexMetricaEvents.REACH_GOAL, target, params, callback);
    }, [tagID]);
    const setUserID = useCallback((userID) => {
        ym(tagID, YandexMetricaEvents.SET_USER_ID, userID);
    }, [tagID]);
    const userParams = useCallback((parameters) => {
        ym(tagID, YandexMetricaEvents.USER_PARAMS, parameters);
    }, [tagID]);
    const ymEvent = useCallback((...parameters) => {
        ym(tagID, ...parameters);
    }, [tagID]);
    return {
        notBounce,
        reachGoal,
        setUserID,
        userParams,
        ymEvent
    };
};
export { useYandexMetrica };
//# sourceMappingURL=use-metrica.js.map