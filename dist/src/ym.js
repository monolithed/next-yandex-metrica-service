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
function ym(tagID, ...params) {
    var _a;
    if (!tagID) {
        return void 0;
    }
    (_a = window.ym) === null || _a === void 0 ? void 0 : _a.call(window, tagID, ...params);
}
export { ym };
//# sourceMappingURL=ym.js.map