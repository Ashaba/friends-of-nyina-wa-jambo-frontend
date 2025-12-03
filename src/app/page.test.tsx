import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

describe('Home Page', () => {
  test('renders Message of the Day heading', () => {
    render(<Home />)
    const heading = screen.getByText(/Message of the Day/i)
    expect(heading).toBeInTheDocument()
  })

  test('renders Coming soon message', () => {
    render(<Home />)
    const message = screen.getByText(/Coming soon/i)
    expect(message).toBeInTheDocument()
  })

  test('renders with proper structure', () => {
    const { container } = render(<Home />)
    const mainElement = container.querySelector('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('container')
  })
})
