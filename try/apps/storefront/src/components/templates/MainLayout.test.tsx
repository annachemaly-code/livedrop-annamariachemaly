import { render, screen } from '@testing-library/react'
import { MainLayout } from './MainLayout'

describe('MainLayout', () => {
  it('renders without crashing', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    )
  })
})
