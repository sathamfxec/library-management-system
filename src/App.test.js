import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<App />', () => {
  test('it should mount', () => {
    render(<App />);
    
    const app = screen.getByTestId('App');

    expect(app).toBeInTheDocument();
  });
});