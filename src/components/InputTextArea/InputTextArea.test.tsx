import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputTextArea from './InputTextArea';

describe('InputTextArea component', () => {
    const defaultProps = {
        inputText: '',
        onTextChange: vi.fn(),
    };

    it('renders placeholder and value', () => {
        const { getByPlaceholderText, getByDisplayValue } = render(
            <InputTextArea {...defaultProps} inputText="Test input" />
        );
        const textarea = getByPlaceholderText('Paste email or text block here...');
        expect(textarea).not.toBeNull();
        const value = getByDisplayValue('Test input');
        expect(value).not.toBeNull();
    });

    it('calls onTextChange when typing', async () => {
        const mockChange = vi.fn();
        const { getByPlaceholderText } = render(
            <InputTextArea {...defaultProps} onTextChange={mockChange} />
        );
        const textarea = getByPlaceholderText('Paste email or text block here...');
        await userEvent.type(textarea, 'Hello');
        expect(mockChange).toHaveBeenCalled();
    });
});

afterEach(() => cleanup());
