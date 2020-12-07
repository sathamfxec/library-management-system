import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookRequest from './BookRequest';

describe('<BookRequest />', () => {
  test('it should mount', () => {
    render(<BookRequest />);
    
    const bookRequest = screen.getByTestId('BookRequest');

    expect(bookRequest).toBeInTheDocument();
  });
});