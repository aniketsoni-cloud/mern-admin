/**
 * Accessibility Utility Functions
 * Provides keyboard navigation and ARIA support utilities
 */

export interface KeyboardNavigationOptions {
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
}

export const handleKeyPress = (
  event: React.KeyboardEvent,
  options: KeyboardNavigationOptions
): void => {
  const { key, shiftKey } = event;

  switch (key) {
    case 'Enter':
      if (options.onEnter) {
        event.preventDefault();
        options.onEnter();
      }
      break;
    case ' ':
      if (options.onSpace) {
        event.preventDefault();
        options.onSpace();
      }
      break;
    case 'Escape':
      if (options.onEscape) {
        event.preventDefault();
        options.onEscape();
      }
      break;
    case 'ArrowUp':
      if (options.onArrowUp) {
        event.preventDefault();
        options.onArrowUp();
      }
      break;
    case 'ArrowDown':
      if (options.onArrowDown) {
        event.preventDefault();
        options.onArrowDown();
      }
      break;
    case 'ArrowLeft':
      if (options.onArrowLeft) {
        event.preventDefault();
        options.onArrowLeft();
      }
      break;
    case 'ArrowRight':
      if (options.onArrowRight) {
        event.preventDefault();
        options.onArrowRight();
      }
      break;
    case 'Tab':
      if (options.onTab && !shiftKey) {
        options.onTab();
      }
      break;
  }
};

export const createAriaLabel = (product: {
  name: string;
  price: number;
  category: string;
  rating: number;
}): string => {
  return `${product.name}, Category: ${product.category}, Price: ${product.price}, Rating: ${product.rating} out of 5 stars`;
};

export const createAriaDescribedBy = (id: string, description: string): string => {
  return `${id}-description`;
};

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const focusElement = (elementId: string, delay: number = 0): void => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }, delay);
};

export const trapFocus = (containerElement: HTMLElement): (() => void) => {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  containerElement.addEventListener('keydown', handleTabKey);

  return () => {
    containerElement.removeEventListener('keydown', handleTabKey);
  };
};
