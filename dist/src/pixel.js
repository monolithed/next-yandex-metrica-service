import { jsx as _jsx } from "react/jsx-runtime";
import { Endpoints } from './endpoints';
const MetricaPixel = ({ tagId }) => {
    let src = `${Endpoints.WATCH}/${tagId}`;
    return (_jsx("img", { src: src, style: { display: 'none' }, "data-testid": "yandex-metrica-pixel-img", alt: "", height: "1", width: "1" }));
};
export { MetricaPixel };
//# sourceMappingURL=pixel.js.map