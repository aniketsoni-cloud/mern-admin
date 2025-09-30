/**
 * Accessibility Utilities Unit Tests
 */

import { handleKeyPress, createAriaLabel, announceToScreenReader } from '../accessibility.utils';

describe('Accessibility Utils', () => {
  describe('handleKeyPress', () => {
    it('should call onEnter when Enter key is pressed', () => {
      const onEnter = jest.fn();
      const event = {
        key: 'Enter',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onEnter });

      expect(onEnter).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call onSpace when Space key is pressed', () => {
      const onSpace = jest.fn();
      const event = {
        key: ' ',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onSpace });

      expect(onSpace).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call onEscape when Escape key is pressed', () => {
      const onEscape = jest.fn();
      const event = {
        key: 'Escape',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onEscape });

      expect(onEscape).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call onArrowUp when ArrowUp key is pressed', () => {
      const onArrowUp = jest.fn();
      const event = {
        key: 'ArrowUp',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onArrowUp });

      expect(onArrowUp).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call onArrowDown when ArrowDown key is pressed', () => {
      const onArrowDown = jest.fn();
      const event = {
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onArrowDown });

      expect(onArrowDown).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not call any handler if key is not registered', () => {
      const onEnter = jest.fn();
      const event = {
        key: 'a',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      handleKeyPress(event, { onEnter });

      expect(onEnter).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should not call handler if not provided', () => {
      const event = {
        key: 'Enter',
        preventDefault: jest.fn(),
        shiftKey: false,
      } as any;

      expect(() => handleKeyPress(event, {})).not.toThrow();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('createAriaLabel', () => {
    it('should create comprehensive ARIA label for product', () => {
      const product = {
        name: 'Wireless Mouse',
        price: 1999,
        category: 'Electronics',
        rating: 4.5,
      };

      const result = createAriaLabel(product);

      expect(result).toContain('Wireless Mouse');
      expect(result).toContain('Electronics');
      expect(result).toContain('1999');
      expect(result).toContain('4.5');
      expect(result).toContain('out of 5 stars');
    });

    it('should handle special characters in product name', () => {
      const product = {
        name: 'USB-C Hub & Adapter',
        price: 2999,
        category: 'Accessories',
        rating: 4.0,
      };

      const result = createAriaLabel(product);

      expect(result).toContain('USB-C Hub & Adapter');
    });

    it('should handle zero rating', () => {
      const product = {
        name: 'Test Product',
        price: 100,
        category: 'Test',
        rating: 0,
      };

      const result = createAriaLabel(product);

      expect(result).toContain('Rating: 0');
    });
  });

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should create announcement element with polite priority', () => {
      announceToScreenReader('Test message', 'polite');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement).not.toBeNull();
      expect(announcement?.getAttribute('aria-live')).toBe('polite');
      expect(announcement?.textContent).toBe('Test message');
    });

    it('should create announcement element with assertive priority', () => {
      announceToScreenReader('Error message', 'assertive');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement).not.toBeNull();
      expect(announcement?.getAttribute('aria-live')).toBe('assertive');
      expect(announcement?.textContent).toBe('Error message');
    });

    it('should remove announcement element after timeout', () => {
      announceToScreenReader('Test message', 'polite');

      let announcement = document.querySelector('[role="status"]');
      expect(announcement).not.toBeNull();

      jest.advanceTimersByTime(1000);

      announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeNull();
    });

    it('should default to polite priority', () => {
      announceToScreenReader('Test message');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement?.getAttribute('aria-live')).toBe('polite');
    });
  });
});
