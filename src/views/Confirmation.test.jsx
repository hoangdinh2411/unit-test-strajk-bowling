import { beforeEach } from 'vitest';
import Confirmation from './Confirmation';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import router from '../router';
describe('Testing Confirmation page', () => {
  beforeEach(() => {
    render(
      <RouterProvider router={router}>
        <Confirmation />
      </RouterProvider>
    );
  });
  it('Should show the message if there is no booking', () => {
    fireEvent.click(screen.getByTestId('navigation-icon'));
    fireEvent.click(screen.getByText('Confirmation'));
    expect(screen.getByText('See you soon!')).toBeInTheDocument();
    expect(screen.getByText('Inga bokning gjord!')).toBeInTheDocument();
  });
});
