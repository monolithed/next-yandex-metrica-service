import type React from 'react';
import {Endpoints} from './endpoints';

type Props = {
    tagId: number;
};

const MetricaPixel: React.FunctionComponent<Props> = ({tagId}) => {
    let src = `${Endpoints.WATCH}/${tagId}`;

    return (
        <img src={src}
             style={{display: 'none'}}
             data-testid="yandex-metrica-pixel-img"
             alt=""
             height="1"
             width="1"
        />
    );
}

export {MetricaPixel};
