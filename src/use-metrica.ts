import {useCallback, useContext} from 'react';

import {
    type VisitParameters,
    type UserParameters,
    MetricaTagIDContext
} from './provider';

import {
    YandexMetricaEventParameters,
    YandexMetricaEvents,
    UserParamsEventParameters,
    NotBounceEventParameters,
    ReachGoalEventParameters,
    SetUserIDEventParameters
} from './events';

import {ym} from './ym';

interface UseYandexMetricaReturn {
    notBounce: (options?: () => void) => void;
    reachGoal: (target: string, params?: VisitParameters, callback?: () => void) => void;
    setUserID: (userID: string) => void;
    userParams: (parameters: UserParameters) => void;
    ymEvent: <T extends YandexMetricaEventParameters>(...parameters: T) => void;
}

const useYandexMetrica = (): UseYandexMetricaReturn => {
    const tagID = useContext(MetricaTagIDContext)!;

    const notBounce = useCallback((options?: () => void) => {
        ym<NotBounceEventParameters>(tagID, YandexMetricaEvents.NOT_BOUNCE, options);
    }, [tagID]);

    const reachGoal = useCallback((target: string, params?: VisitParameters, callback?: () => void) => {
        ym<ReachGoalEventParameters>(tagID, YandexMetricaEvents.REACH_GOAL, target, params, callback);
    }, [tagID]);

    const setUserID = useCallback((userID: string) => {
        ym<SetUserIDEventParameters>(tagID, YandexMetricaEvents.SET_USER_ID, userID);
    }, [tagID]);

    const userParams = useCallback((parameters: UserParameters) => {
        ym<UserParamsEventParameters>(tagID, YandexMetricaEvents.USER_PARAMS, parameters);
    }, [tagID]);

    const ymEvent = useCallback(<T extends YandexMetricaEventParameters>(...parameters: T) => {
        ym<T>(tagID, ...parameters);
    }, [tagID]);

    return {
        notBounce,
        reachGoal,
        setUserID,
        userParams,
        ymEvent
    };
};

export {useYandexMetrica};
