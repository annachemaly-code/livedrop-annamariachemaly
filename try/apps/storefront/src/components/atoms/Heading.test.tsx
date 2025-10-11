import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders without crashing', () => {
    // Provide some children
    render(<Heading>Test Heading</Heading>);

    // check that the text is rendered
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });
});
