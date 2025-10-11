# Component Prompts Log

This file records the prompts used to scaffold React components for the Storefront project.

## Atoms

### Button
**Prompt:**  
Create a reusable React button with Tailwind CSS supporting children, props, disabled state, and custom classes.

### Heading
**Prompt:**  
Create a Heading component in React that accepts a level prop (1-6) and children, and applies TailwindCSS styles for font size and weight based on the heading level.


### Input
**Prompt:**  
Create a reusable React input component that forwards standard input props and applies Tailwind CSS styles for border, padding, and rounded corners.


## Molecules

### ProductCard
**Prompt:**  
Create a ProductCard component in React that displays a product's image, title, price, stock quantity, and an Add to Cart button, and accepts a callback for the Add to Cart action.

### SearchBar
**Prompt:**  
Create a SearchBar component in React that accepts a query string, a setQuery callback function, and renders an input field styled with TailwindCSS for user search.

### SortFilterControls
**Prompt:**  
Create a SortFilterControls component in React that provides controls to sort by price (asc/desc) and filter by product tags, with callbacks for sort and filter changes.

## Organisms

### AskSupportPanel
**Prompt:**  
Create an AskSupportPanel component in React that shows a slide-over panel, accepts a question input, displays conversation messages, matches questions to a ground-truth JSON file, and fetches order status if an order ID is present.

## Templates

### MainLayout
**Prompt:**  
Create a MainLayout component in React that provides a page wrapper with header, main content area, and footer slots, using TailwindCSS for consistent spacing and layout.


## Refactor Catalog Page

**Prompt:**  
Refactor the `Catalog.tsx` page to follow atomic design principles by breaking it into reusable components, organizing them as Atoms, Molecules, and Organisms, and applying Tailwind CSS for consistent styling and layout.

## Tests
**Prompt:**
Add tests to these components.

## Documentation
**Prompt:**
Add documentation for these components using storybook to provide interactive documentation and visual testing.

