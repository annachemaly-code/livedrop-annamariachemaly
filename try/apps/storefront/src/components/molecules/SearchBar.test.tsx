import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    render(
      <SearchBar 
        query="" 
        setQuery={() => {}} 
      />
    );

    // check that the placeholder is rendered
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });
});
