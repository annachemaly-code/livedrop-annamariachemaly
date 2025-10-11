import { render, screen } from '@testing-library/react';
import { SortFilterControls } from './SortFilterControls';

describe('SortFilterControls', () => {
  it('renders without crashing', () => {
    // Provide all required props
    render(
      <SortFilterControls
        sortOrder="asc"
        onSortChange={() => {}}
        filterTag=""
        onFilterChange={() => {}}
        allTags={['tag1', 'tag2', 'tag3']}
      />
    );

    //check that the first option exists
    expect(screen.getByText('All Tags')).toBeInTheDocument();
  });
});
