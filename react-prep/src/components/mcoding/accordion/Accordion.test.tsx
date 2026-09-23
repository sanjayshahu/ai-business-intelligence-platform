/* eslint-disable testing-library/no-node-access */
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Accordion from './Accordion'

// ----------------------------------------------------
// Mock Data
// ----------------------------------------------------
const mockData = [
  { title: 'First Item', desc: 'First description content' },
  { title: 'Second Item', desc: 'Second description content' }
]

const singleItemData = [
  { title: 'Single Item', desc: 'Single description content' }
]

const emptyData: any[] = []

// ----------------------------------------------------
// Helpers
// ----------------------------------------------------
const setup = (props = {}) => {
  return render(<Accordion {...props} />)
}

const getButtonByTitle = (title: string) =>
  screen.getByText(title).closest('button') as HTMLButtonElement

afterEach(() => {
  window.history.pushState({}, '', '/')
})

// ====================================================
// Accordion Component
// ====================================================

describe('Accordion Component', () => {
  // ==================================================
  // RENDERING STATES
  // STATES:
  // data exists
  // data empty
  // default data
  // ==================================================

  describe('Rendering States', () => {
    test('renders heading always', () => {
      setup({ data: mockData })

      expect(
        screen.getByRole('heading', { name: 'Accordion' })
      ).toBeInTheDocument()
    })

    test('renders accordion items when data is provided', () => {
      setup({ data: mockData })

      expect(screen.getByText('First Item')).toBeInTheDocument()
      expect(screen.getByText('Second Item')).toBeInTheDocument()

      // descriptions hidden initially
      expect(
        screen.queryByText('First description content')
      ).not.toBeInTheDocument()
    })

    test('renders no items found when empty data is provided', () => {
      setup({ data: emptyData })

      expect(
        screen.getByRole('heading', {
          name: /no items found/i
        })
      ).toBeInTheDocument()
    })

    test('uses default data when no prop is passed', () => {
      setup()

      expect(
        screen.getByRole('heading', { name: 'Accordion' })
      ).toBeInTheDocument()

      expect(
        screen.getAllByRole('button').length
      ).toBeGreaterThan(0)
    })

    test('renders single item dataset correctly', () => {
      setup({ data: singleItemData })

      expect(
        screen.getByText('Single Item')
      ).toBeInTheDocument()

      expect(
        screen.queryByText('Single description content')
      ).not.toBeInTheDocument()
    })
  })

  // ==================================================
  // INTERACTION STATES
  // STATES:
  // oi = null
  // oi = 0
  // oi = 1
  //
  // TRANSITIONS:
  // null -> 0
  // 0 -> null
  // 0 -> 1
  // ==================================================

  describe('Interaction States', () => {
    test('opens item when clicked', async () => {
      const user = userEvent.setup()

      setup({ data: mockData })

      await user.click(getButtonByTitle('First Item'))

      expect(
        screen.getByText('First description content')
      ).toBeInTheDocument()
    })

    test('closes item when clicked again', async () => {
      const user = userEvent.setup()

      setup({ data: mockData })

      const button = getButtonByTitle('First Item')

      await user.click(button)
      await user.click(button)

      expect(
        screen.queryByText('First description content')
      ).not.toBeInTheDocument()
    })

    test('switches from first item to second item', async () => {
      const user = userEvent.setup()

      setup({ data: mockData })

      await user.click(getButtonByTitle('First Item'))

      expect(
        screen.getByText('First description content')
      ).toBeInTheDocument()

      await user.click(getButtonByTitle('Second Item'))

      expect(
        screen.queryByText('First description content')
      ).not.toBeInTheDocument()

      expect(
        screen.getByText('Second description content')
      ).toBeInTheDocument()
    })
  })

  // ==================================================
  // DERIVED UI OUTPUTS
  // OUTPUTS:
  // closed arrow = d
  // opened arrow = u
  // ==================================================

  describe('Derived UI Outputs', () => {
    test('shows down arrow initially', () => {
      setup({ data: singleItemData })

      const button = getButtonByTitle('Single Item')
      const arrow = button.querySelector('.a-a')

      expect(arrow).toHaveTextContent('d')
    })

    test('changes arrow to up when item opens', async () => {
      const user = userEvent.setup()

      setup({ data: singleItemData })

      const button = getButtonByTitle('Single Item')
      const arrow = button.querySelector('.a-a')

      await user.click(button)

      expect(arrow).toHaveTextContent('u')
    })
  })

  // ==================================================
  // URL / QUERY PARAM BRANCHES
  // BRANCH:
  // finalData = isEmpty ? [] : data
  // ==================================================

  describe('URL Query Param Logic', () => {
    test('overrides provided data when empty=true', () => {
      window.history.pushState({}, '', '/?empty=true')

      setup({
        data: [
          {
            title: 'Item 1',
            desc: 'Desc 1'
          }
        ]
      })

      expect(
        screen.getByRole('heading', {
          name: /no items found/i
        })
      ).toBeInTheDocument()

      expect(
        screen.queryByText('Item 1')
      ).not.toBeInTheDocument()
    })

    test('uses provided data when empty=false', () => {
      window.history.pushState({}, '', '/?empty=false')

      setup({ data: mockData })

      expect(
        screen.getByText('First Item')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Second Item')
      ).toBeInTheDocument()
    })
  })
})