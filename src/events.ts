import type {
    InitParameters,
    UserParameters,
    VisitParameters,
} from './provider';

enum YandexMetricaEvents {
    HIT = 'hit',
    INIT = 'init',
    FILE = 'file',
    ADD_FILE_EXTENSION = 'addFileExtension',
    GET_CLIENT_ID = 'getClientID',
    NOT_BOUNCE = 'notBounce',
    FIRST_PARTY_PARAMS = 'firstPartyParams',
    EXT_LINK = 'extLink',
    REACH_GOAL = 'reachGoal',
    SET_USER_ID = 'setUserID',
    PARAMS = 'params',
    USER_PARAMS = 'userParams'
}

type BaseOptions = {
    title?: string;
    params?: VisitParameters;
    callback?: () => void;
}

type FileOptions = BaseOptions & {
    referer?: string;
};

type FirstPartyParamsParameters = {
    email?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    home_address?: string;
    street?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country?: string;
    yandex_cid?: number;
};

type FileEventParameters = [
    eventName: YandexMetricaEvents.FILE,
    url: string,
    options?: FileOptions
];

type InitEventParameters = [
    eventName: YandexMetricaEvents.INIT,
    parameters: InitParameters
];

type AddFileExtensionEventParameters = [
    eventName: YandexMetricaEvents.ADD_FILE_EXTENSION,
    extensions: string | string[]
];

type ExtLinkEventParameters = [
    eventName: YandexMetricaEvents.EXT_LINK,
    url: string,
    options?: BaseOptions
];

type FirstPartyParamsEventParameters = [
    eventName: YandexMetricaEvents.FIRST_PARTY_PARAMS,
    parameters: FirstPartyParamsParameters
];

type GetClientIDEventParameters = [
    eventName: YandexMetricaEvents.GET_CLIENT_ID,
    cb: (clientID: string) => void
];

type HitEventParameters = [
    eventName: YandexMetricaEvents.HIT,
    url: string,
    options?: FileOptions
];

type NotBounceEventParameters = [
    eventName: YandexMetricaEvents.NOT_BOUNCE,
    options?: () => void
];

type ParamsEventParameters = [
    eventName: YandexMetricaEvents.PARAMS,
    parameters: VisitParameters | VisitParameters[]
];

type ReachGoalEventParameters = [
    eventName: YandexMetricaEvents.REACH_GOAL,
    target: string,
    params?: VisitParameters,
    callback?: () => void
];

type SetUserIDEventParameters = [
    eventName: YandexMetricaEvents.SET_USER_ID,
    userID: string
];

type UserParamsEventParameters = [
    eventName: YandexMetricaEvents.USER_PARAMS,
    parameters: UserParameters
];

type YandexMetricaEventParameters =
    InitEventParameters |
    AddFileExtensionEventParameters |
    ExtLinkEventParameters |
    FileEventParameters |
    FirstPartyParamsEventParameters |
    GetClientIDEventParameters |
    HitEventParameters |
    NotBounceEventParameters |
    ParamsEventParameters |
    ReachGoalEventParameters |
    SetUserIDEventParameters |
    UserParamsEventParameters;

export type {
    YandexMetricaEventParameters,
    InitEventParameters,
    AddFileExtensionEventParameters,
    ExtLinkEventParameters,
    FileEventParameters,
    FirstPartyParamsEventParameters,
    GetClientIDEventParameters,
    HitEventParameters,
    NotBounceEventParameters,
    ParamsEventParameters,
    ReachGoalEventParameters,
    SetUserIDEventParameters,
    UserParamsEventParameters
};

export {YandexMetricaEvents};
