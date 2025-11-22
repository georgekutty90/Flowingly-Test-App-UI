import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button, { type ButtonProps } from './Button';

describe('Button component', () => {
    const defaultProps: ButtonProps = {
        className: 'test-class',
        value: 'Click Me',
        isEnable: true,
        onClick: vi.fn(),
    };

    afterEach(() => cleanup());

    it('renders with the provided text', () => {
        const { getByRole } = render(<Button {...defaultProps} />);
        const btn = getByRole('button', { name: /Click Me/i });
        expect(btn).not.toBeNull();
    });

    it('applies classes and is enabled when `isEnable` is true', () => {
        const { getByRole } = render(<Button {...defaultProps} />);
        const btn = getByRole('button', { name: /Click Me/i }) as HTMLButtonElement;
        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('test-class');
        expect(btn.disabled).toBe(false);
    });

    it('is disabled and has disable class when `isEnable` is false', () => {
        const { getByRole } = render(<Button {...defaultProps} isEnable={false} />);
        const btn = getByRole('button', { name: /Click Me/i }) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
        expect(btn.className).toContain('disable');
    });

    it('calls onClick when clicked and enabled', async () => {
        const onClick = vi.fn();
        const { getByRole } = render(<Button {...defaultProps} onClick={onClick} />);
        const btn = getByRole('button', { name: /Click Me/i });
        await userEvent.click(btn);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
        const onClick = vi.fn();
        const { getByRole } = render(<Button {...defaultProps} isEnable={false} onClick={onClick} />);
        const btn = getByRole('button', { name: /Click Me/i });
        await userEvent.click(btn);
        expect(onClick).not.toHaveBeenCalled();
    });
});
