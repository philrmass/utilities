import { effect, signal } from '@preact/signals';

function initStoredSignal(key, initialValue) {
  const stored = window.localStorage.getItem(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error('signal localStorage error:', key, stored, err); //eslint-disable-line no-console
    }
  }

  window.localStorage.setItem(key, JSON.stringify(initialValue));
  return initialValue;
}

export function storedSignal(key, initialValue) {
  const sig = signal(initStoredSignal(key, initialValue));
  effect(() => window.localStorage.setItem(key, JSON.stringify(sig.value)));

  return sig;
}
