import type {
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
} from '@/events';

type Foo = [tagID: number | null, parameters: YandexMetricaEventParameters];

// function ym<T extends Foo>(...foo: Foo[]): void;

// function ym(tagID: null): void;
// function ym(tagID: number, ...params: InitEventParameters): void;
// function ym(tagID: number, ...params: AddFileExtensionEventParameters): void;
// function ym(tagID: number, ...params: ExtLinkEventParameters): void;
// function ym(tagID: number, ...params: FileEventParameters): void;
// function ym(tagID: number, ...params: FirstPartyParamsEventParameters): void;
// function ym(tagID: number, ...params: GetClientIDEventParameters): void;
// function ym(tagID: number, ...params: HitEventParameters): void;
// function ym(tagID: number, ...params: NotBounceEventParameters): void;
// function ym(tagID: number, ...params: ParamsEventParameters): void;
// function ym(tagID: number, ...params: ReachGoalEventParameters): void;
// function ym(tagID: number, ...params: SetUserIDEventParameters): void;
// function ym(tagID: number, ...params: UserParamsEventParameters): void;

function ym<T extends YandexMetricaEventParameters>(tagID: number, ...params: T): void {
    if (!tagID) {
        return void 0;
    }

    window.ym?.(tagID, ...params);
}

export {ym};
