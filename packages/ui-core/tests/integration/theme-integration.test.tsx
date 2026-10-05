import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider'
import { mockTrimindsConfig } from '../fixtures/mock-data'

function TestComponent() {
  const { theme, config, updateTheme } = useTheme()
  return (
    <div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <div data-testid="density">{theme.density}</div>
      <button
        onClick={() =>
          updateTheme({
            theme: { density: 'compact' },
          })
        }
      >
        Change Density
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('primary-color')).toBeInTheDocument()
  })

  it('applies default theme when no initialConfig provided', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    const primaryColor = screen.getByTestId('primary-color')
    expect(primaryColor.textContent).toBe('#2563EB')
  })

  it('applies custom initialConfig', () => {
    render(
      <ThemeProvider initialConfig={mockTrimindsConfig}>
        <TestComponent />
      </ThemeProvider>
    )
    const density = screen.getByTestId('density')
    expect(density.textContent).toBe('comfortable')
  })

  it('throws error when useTheme is used outside ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    consoleError.mockRestore()
  })

  it('allows updating theme through updateTheme function', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    const button = screen.getByText('Change Density')
    await user.click(button)
    const density = screen.getByTestId('density')
    expect(density.textContent).toBe('compact')
  })

  it('applies CSS variables to document root', () => {
    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>
    )
    const root = document.documentElement
    const primaryColor = root.style.getPropertyValue('--color-primary')
    expect(primaryColor).toBeDefined()
  })

  it('applies density-compact class when density is compact', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    const button = screen.getByText('Change Density')
    await user.click(button)
    const root = document.documentElement
    expect(root.classList.contains('density-compact')).toBe(true)
  })
})
