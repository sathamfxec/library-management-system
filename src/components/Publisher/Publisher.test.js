import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Publisher from './Publisher';

describe('<Publisher />', () => {
  test('it should mount', () => {
    render(<Publisher />);
    
    const publisher = screen.getByTestId('Publisher');

    expect(publisher).toBeInTheDocument();
  });
});