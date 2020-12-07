import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestForApproval from './RequestForApproval';

describe('<RequestForApproval />', () => {
  test('it should mount', () => {
    render(<RequestForApproval />);
    
    const requestForApproval = screen.getByTestId('RequestForApproval');

    expect(requestForApproval).toBeInTheDocument();
  });
});