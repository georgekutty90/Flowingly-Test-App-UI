
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailParser from './EmailParser';
import * as useEmailParserModule from '../../hooks/UseEmailParser/useEmailParser';

afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
});

describe('EmailParser component', () => {
    it('renders title and submit disabled initially', () => {
        vi.spyOn(useEmailParserModule, 'default').mockImplementation(() => ({
            isLoading: false,
            isSuccess: false,
            parseData: null,
            message: '',
            submitEmailParser: vi.fn(),
            clearParseData: vi.fn(),
        } as any));

        render(<EmailParser />);
        expect(screen.getByTestId('title').textContent).toBe('XML / Email Parser');
        const submitBtn = screen.getByRole('button', { name: /submit to server/i }) as HTMLButtonElement;
        expect(submitBtn.disabled).toBe(true);
    });

    it('enables submit when typing and calls submitEmailParser', async () => {
        const submitMock = vi.fn();
        vi.spyOn(useEmailParserModule, 'default').mockImplementation(() => ({
            isLoading: false,
            isSuccess: false,
            parseData: null,
            message: '',
            submitEmailParser: submitMock,
            clearParseData: vi.fn(),
        } as any));

        render(<EmailParser />);
        const textarea = screen.getByPlaceholderText('Paste email or text block here...');
        await userEvent.type(textarea, 'hello');

        const submitBtn = screen.getByRole('button', { name: /submit to server/i }) as HTMLButtonElement;
        expect(submitBtn.disabled).toBe(false);

        await userEvent.click(submitBtn);
        expect(submitMock).toHaveBeenCalledWith('hello');
    });

    it('shows output when isSuccess true', () => {
        const parseObj = { foo: 'bar' };
        vi.spyOn(useEmailParserModule, 'default').mockImplementation(() => ({
            isLoading: false,
            isSuccess: true,
            parseData: parseObj,
            message: '',
            submitEmailParser: vi.fn(),
            clearParseData: vi.fn(),
        } as any));

        render(<EmailParser />);
        expect(screen.getByTestId('output-display').textContent).toContain(JSON.stringify(parseObj, null, 2));
    });

    it('shows validation message when not success and not loading', () => {
        vi.spyOn(useEmailParserModule, 'default').mockImplementation(() => ({
            isLoading: false,
            isSuccess: false,
            parseData: null,
            message: 'Invalid',
            submitEmailParser: vi.fn(),
            clearParseData: vi.fn(),
        } as any));

        render(<EmailParser />);
        expect(screen.getByTestId('validation-error').textContent).toBe('Invalid');
    });
});
