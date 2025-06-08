import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { YandexMetricaProvider } from '@/provider';
import { useTrackRouteChange } from '@/use-track-route-change';
jest.mock('../src/use-track-route-change.ts');
jest.mock('next/script', () => (props) => {
    return _jsx("div", Object.assign({}, props));
});
const METRICA_SCRIPT = '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");';
const METRICA_SCRIPT_ALTERNATIVE_CDN = '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");';
const TAG_ID = 444;
describe('YandexMetricaProvider', () => {
    it('renders', () => {
        render(_jsx(YandexMetricaProvider, { tagID: TAG_ID, children: _jsx("div", {}) }));
        expect(useTrackRouteChange).toHaveBeenCalledWith({ tagID: TAG_ID });
        expect(document.getElementById('yandex-metrica')).toHaveTextContent(`${METRICA_SCRIPT} ym(${TAG_ID}, "init", {});`);
        expect(document.getElementById('yandex-metrica-pixel')).toBeInTheDocument();
    });
    it('renders with custom init parameters', () => {
        render(_jsx(YandexMetricaProvider, { tagID: 444, initParameters: {
                accurateTrackBounce: false,
                clickmap: false
            }, children: _jsx("div", {}) }));
        expect(document.getElementById('yandex-metrica')).toHaveTextContent(`${METRICA_SCRIPT} ym(${TAG_ID}, "init", {"accurateTrackBounce":false,"clickmap":false});`);
    });
    it('renders with an alternative CDN url', () => {
        render(_jsx(YandexMetricaProvider, { tagID: TAG_ID, script: "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", children: _jsx("div", {}) }));
        expect(useTrackRouteChange).toHaveBeenCalledWith({ tagID: TAG_ID });
        expect(document.getElementById('yandex-metrica')).toHaveTextContent(`${METRICA_SCRIPT_ALTERNATIVE_CDN} ym(${TAG_ID}, "init", {});`);
        expect(document.getElementById('yandex-metrica-pixel')).toBeInTheDocument();
    });
    it('renders children when tagID is not defined', () => {
        const spyOnWarn = jest.spyOn(console, 'warn').mockImplementation();
        render(_jsx(YandexMetricaProvider, { children: _jsx("div", { id: "content" }) }));
        expect(document.getElementById('content')).toBeInTheDocument();
        expect(document.getElementById('yandex-metrica')).not.toBeInTheDocument();
        expect(spyOnWarn).toHaveBeenCalledWith('[next-yandex-metrica] Yandex.Metrica tag ID is not defined');
    });
    it('gets tagID from NEXT_PUBLIC_YANDEX_METRICA_ID', () => {
        process.env.NEXT_PUBLIC_YANDEX_METRICA_ID = `${TAG_ID}`;
        render(_jsx(YandexMetricaProvider, { children: _jsx("div", {}) }));
        expect(document.getElementById('yandex-metrica')).toHaveTextContent(`${METRICA_SCRIPT} ym(${TAG_ID}, "init", {});`);
    });
});
//# sourceMappingURL=provider.js.map