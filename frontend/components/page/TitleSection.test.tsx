/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TitleSection } from './TitleSection';

describe('TitleSection', () => {
  it('renders the title and description', () => {
    render(<TitleSection />);

    // Check if the title is rendered
    expect(screen.getByRole('heading', { name: /Background Remover/i })).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        /Upload an image and remove its background using client-side AI./i
      )
    ).toBeInTheDocument();
  });
}); 