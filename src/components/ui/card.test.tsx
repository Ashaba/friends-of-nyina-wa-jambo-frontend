import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

describe('Card Components', () => {
  describe('Card', () => {
    test('renders card with content', () => {
      render(<Card data-testid="card">Card content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent('Card content')
    })

    test('applies base classes', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('rounded-xl', 'border', 'shadow')
    })

    test('accepts custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('CardHeader', () => {
    test('renders header with content', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent('Header')
    })

    test('applies flex column classes', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('flex', 'flex-col')
    })
  })

  describe('CardTitle', () => {
    test('renders title with content', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Title')
    })

    test('applies font semibold class', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('font-semibold')
    })
  })

  describe('CardDescription', () => {
    test('renders description with content', () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>)
      const desc = screen.getByTestId('desc')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveTextContent('Description')
    })

    test('applies text muted class', () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>)
      const desc = screen.getByTestId('desc')
      expect(desc).toHaveClass('text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    test('renders content', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Content')
    })

    test('applies padding classes', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    test('renders footer', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveTextContent('Footer')
    })

    test('applies flex classes', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center')
    })
  })

  describe('Complete Card', () => {
    test('renders full card with all parts', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByText('Test Footer')).toBeInTheDocument()
    })
  })
})
