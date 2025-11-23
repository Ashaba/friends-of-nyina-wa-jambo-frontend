import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const MockHome = () => <h1>Message of the Day</h1>

test('renders Message of the Day heading', () => {
  render(<MockHome />)
  const heading = screen.getByText(/Message of the Day/i)
  expect(heading).toBeInTheDocument()
})
