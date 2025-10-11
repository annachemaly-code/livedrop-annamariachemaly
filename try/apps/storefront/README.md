# Storefront v1

A minimal, fast e-commerce frontend built with React, Vite, and TailwindCSS.  
Implements the journey: Catalog → Product → Cart → Checkout → Order Status, with an Ask Support panel powered by ground-truth Q&A.

## Features

- Catalog grid with search, sorting, and tag filters  
- Product details with related items  
- Persistent cart (in-memory + localStorage)  
- Checkout stub and fake order creation  
- Order status with mocked statuses  
- Ask Support panel (no external data, local Q&A only)  
- TailwindCSS styling and accessibility features

## Installation & Running

```bash
pnpm install      # install dependencies
pnpm dev          # start development server
pnpm build        # build production assets
pnpm preview      # preview production build
pnpm test         # run unit tests
