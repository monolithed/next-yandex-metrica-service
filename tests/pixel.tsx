import React from 'react';
import {render, screen} from '@testing-library/react';

import {MetricaPixel} from '@/pixel';
import {Endpoints} from '@/endpoints';

const TAG_ID = 444;

describe('MetricaPixel', () => {
    it('should render correctly', () => {
        render(<MetricaPixel tagId={TAG_ID}/>);

        const img = screen.getByTestId('yandex-metrica-pixel-img');

        expect(img.getAttribute('src')).toBe(`${Endpoints.WATCH}/${TAG_ID}`);
    });
});
