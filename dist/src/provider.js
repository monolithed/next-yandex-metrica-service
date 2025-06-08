import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useMemo } from 'react';
import Script from 'next/script';
import { MetricaPixel } from './pixel';
import { useTrackRouteChange } from './use-track-route-change';
const MetricaTagIDContext = createContext(null);
var LoadStrategies;
(function (LoadStrategies) {
    LoadStrategies["AFTER_INTERACTIVE"] = "afterInteractive";
    LoadStrategies["LAZY_ONLOAD"] = "lazyOnload";
    LoadStrategies["BEFORE_INTERACTIVE"] = "beforeInteractive";
    LoadStrategies["WORKER"] = "worker";
})(LoadStrategies || (LoadStrategies = {}));
const DEFAULT_SCRIPT = 'https://mc.yandex.ru/metrika/tag.js';
const YandexMetricaProvider = ({ children, tagID, strategy = LoadStrategies.AFTER_INTERACTIVE, script = DEFAULT_SCRIPT, initParameters }) => {
    const id = useMemo(() => {
        const YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
        return tagID || (YANDEX_METRICA_ID ? Number(YANDEX_METRICA_ID) : null);
    }, [tagID]);
    useTrackRouteChange({ tagID: id });
    if (!id) {
        console.warn('[next-yandex-metrica] Yandex.Metrica tag ID is not defined');
        return _jsx(_Fragment, { children: children });
    }
    const options = JSON.stringify(initParameters || {});
    return (_jsxs(_Fragment, { children: [_jsx(Script, { id: "yandex-metrica", strategy: strategy, children: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "${script}", "ym");
                  ym(${id}, "init", ${options});
            ` }), _jsx("noscript", { id: "yandex-metrica-pixel", children: _jsx(MetricaPixel, { tagId: id }) }), _jsx(MetricaTagIDContext.Provider, { value: id, children: children })] }));
};
export { YandexMetricaProvider, MetricaTagIDContext, LoadStrategies };
//# sourceMappingURL=provider.js.map