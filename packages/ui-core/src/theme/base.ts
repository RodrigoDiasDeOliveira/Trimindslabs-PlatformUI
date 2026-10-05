export type ThemeDensity = 'compact' | 'comfortable' | 'wide';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  density: ThemeDensity;
  radius: number;
}

export const baseTheme: Theme = {
  name: 'trimindslabs-corporate',
  primary: '#2563EB',
  secondary: '#6B675F',
  background: '#F5F1E8',
  surface: '#FFFDF8',
  text: '#1F1F1D',
  density: 'comfortable',
  radius: 8
};
