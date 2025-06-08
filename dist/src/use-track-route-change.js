import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { YandexMetricaEvents } from './events';
import { ym } from './ym';
const useTrackRouteChange = ({ tagID }) => {
    const pathname = usePathname();
    useEffect(() => {
        if (!tagID) {
            return void 0;
        }
        const { href } = window.location;
        ym(tagID, YandexMetricaEvents.HIT, href);
    }, [tagID, pathname]);
};
export { useTrackRouteChange };
//# sourceMappingURL=use-track-route-change.js.map