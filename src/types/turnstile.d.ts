
interface TurnstileObject {
  render: (container: HTMLElement, options: TurnstileOptions) => number;
  reset: (widgetId: number) => void;
  remove: (widgetId: number) => void;
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: (error: any) => void;
  theme?: 'light' | 'dark' | 'auto';
  tabindex?: number;
  retry?: 'auto' | 'never';
  refresh_expired?: 'auto' | 'manual' | 'never';
  appearance?: 'always' | 'execute' | 'interaction-only';
}

interface Window {
  turnstile?: TurnstileObject;
}
