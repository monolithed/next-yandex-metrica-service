import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {type HitEventParameters, YandexMetricaEvents} from './events';
import {ym} from './ym';

type Options = {
    tagID: number | null;
};

const useTrackRouteChange = ({tagID}: Options): void => {
    const pathname = usePathname();

    useEffect(() => {
        if (!tagID) {
            return void 0;
        }

        const {href} = window.location;

        ym<HitEventParameters>(tagID, YandexMetricaEvents.HIT, href);

    }, [tagID, pathname]);
};

export {useTrackRouteChange};
