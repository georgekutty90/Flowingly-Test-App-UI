import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ValidationDisplay from './ValidationDisplay';

describe('ValidationDisplay component', () => {
    it('renders the validation message', () => {
        const msg = 'Error occurred';
        const { getByTestId } = render(<ValidationDisplay message={msg} />);
        const div = getByTestId('validation-error');
        expect(div.textContent).toBe(msg);
    });
});
