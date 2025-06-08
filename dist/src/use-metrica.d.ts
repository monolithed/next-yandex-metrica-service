import { type VisitParameters, type UserParameters } from './provider';
import { YandexMetricaEventParameters } from './events';
interface UseYandexMetricaReturn {
    notBounce: (options?: () => void) => void;
    reachGoal: (target: string, params?: VisitParameters, callback?: () => void) => void;
    setUserID: (userID: string) => void;
    userParams: (parameters: UserParameters) => void;
    ymEvent: <T extends YandexMetricaEventParameters>(...parameters: T) => void;
}
declare const useYandexMetrica: () => UseYandexMetricaReturn;
export { useYandexMetrica };
