import React from 'react';
declare const MetricaTagIDContext: React.Context<number | null>;
type VisitParameters = {
    order_price?: number;
    currency?: string;
    [key: string]: any;
};
type UserParameters = {
    UserID?: number;
    [key: string]: any;
};
type InitParameters = {
    accurateTrackBounce?: boolean | number;
    childIframe?: boolean;
    clickmap?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string | any[];
    params?: VisitParameters | VisitParameters[];
    userParams?: UserParameters;
    trackHash?: boolean;
    trackLinks?: boolean;
    trustedDomains?: string[];
    type?: number;
    webvisor?: boolean;
    triggerEvent?: boolean;
};
declare const enum LoadStrategies {
    AFTER_INTERACTIVE = "afterInteractive",
    LAZY_ONLOAD = "lazyOnload",
    BEFORE_INTERACTIVE = "beforeInteractive",
    WORKER = "worker"
}
type Props = {
    children: React.ReactNode;
    tagID?: number;
    script?: string;
    strategy?: `${LoadStrategies}`;
    initParameters?: InitParameters;
};
declare const YandexMetricaProvider: React.FunctionComponent<Props>;
export { YandexMetricaProvider, MetricaTagIDContext, LoadStrategies };
export type { InitParameters, VisitParameters, UserParameters };
