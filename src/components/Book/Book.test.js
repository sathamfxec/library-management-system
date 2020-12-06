import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Book from './Book';

describe('<Book />', () => {
  test('it should mount', () => {
    render(<Book />);
    
    const book = screen.getByTestId('Book');

    expect(book).toBeInTheDocument();
  });
});