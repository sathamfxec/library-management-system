import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Author from './Author';

describe('<Author />', () => {
  test('it should mount', () => {
    render(<Author />);
    
    const author = screen.getByTestId('Author');

    expect(author).toBeInTheDocument();
  });
});