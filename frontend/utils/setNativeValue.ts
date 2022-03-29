/**
 * Trigger a native change event for an HTMLInputElement.
 * Used to set initial input value (if no 'value' prop is accessible).
 * @param el: HTMLInputElement
 * @param value: string
 */

export const setNativeValue = (el: HTMLInputElement, value: string) => {
  el.value = value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};
