import React, {createContext, useMemo} from 'react';
import Script from 'next/script';

import {MetricaPixel} from './pixel';
import {useTrackRouteChange} from './use-track-route-change';

const MetricaTagIDContext = createContext<number | null>(null);

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

const enum LoadStrategies {
    AFTER_INTERACTIVE = 'afterInteractive',
    LAZY_ONLOAD = 'lazyOnload',
    BEFORE_INTERACTIVE = 'beforeInteractive',
    WORKER = 'worker'
}

type Props = {
    children: React.ReactNode;
    tagID?: number;
    script?: string;
    strategy?: `${LoadStrategies}`;
    initParameters?: InitParameters;
};

const DEFAULT_SCRIPT = 'https://mc.yandex.ru/metrika/tag.js';

const YandexMetricaProvider: React.FunctionComponent<Props> = ({
    children,
    tagID,
    strategy = LoadStrategies.AFTER_INTERACTIVE,
    script = DEFAULT_SCRIPT,
    initParameters
}) => {
    const id = useMemo(() => {
        const YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

        return tagID || (YANDEX_METRICA_ID ? Number(YANDEX_METRICA_ID) : null);
    }, [tagID]);

    useTrackRouteChange({tagID: id});

    if (!id) {
        console.warn('[next-yandex-metrica] Yandex.Metrica tag ID is not defined');

        return <>{children}</>;
    }

    const options = JSON.stringify(initParameters || {});

    return (
        <>
            <Script id="yandex-metrica" strategy={strategy}>
                {`
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "${script}", "ym");
                  ym(${id}, "init", ${options});
            `}
            </Script>

            <noscript id="yandex-metrica-pixel">
                <MetricaPixel tagId={id}/>
            </noscript>

            <MetricaTagIDContext.Provider value={id}>
                {children}
            </MetricaTagIDContext.Provider>
        </>
    );
};

export {
    YandexMetricaProvider,
    MetricaTagIDContext,
    LoadStrategies
};

export type {
    InitParameters,
    VisitParameters,
    UserParameters
};
