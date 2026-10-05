export const mockThemeConfig = {
  colors: {
    primary: '#2563EB',
    primaryForeground: '#FFFDF8',
    secondary: '#6B675F',
    accent: '#EEE9DF',
    background: '#F5F1E8',
    foreground: '#1F1F1D',
    border: '#D6CFC2',
    muted: '#EEE9DF',
    destructive: '#B91C1C',
  },
  radius: {
    lg: '0.75rem',
    md: '0.5rem',
    sm: '0.375rem',
  },
  density: 'comfortable' as const,
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
  },
}

export const mockTrimindsConfig = {
  theme: mockThemeConfig,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
  branding: {
    companyName: 'Trimindslabs',
  },
}
