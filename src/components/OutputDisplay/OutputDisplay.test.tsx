import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import OutputDisplay from './OutputDisplay';

describe('OutputDisplay component', () => {
    it('renders the provided parseData inside a pre', () => {
        const data = '{"key":"value"}';
        const { getByTestId } = render(<OutputDisplay parseData={data} />);
        const pre = getByTestId('output-display');
        expect(pre.textContent).toBe(data);
    });
});
