import { beforeEach, it } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
describe('Testing navigation ', () => {
  beforeEach(() => {
    render(<App />);
    fireEvent.click(screen.getByTestId('navigation-icon'));
  });
  it(' Should have 2 navigation links when clicked on the menu bar icon', () => {
    const navigationLinks = screen.getAllByTestId('navigation-link');
    expect(navigationLinks.length).toBe(2);
    expect(navigationLinks[0].textContent).toBe('Booking');
    expect(navigationLinks[1].textContent).toBe('Confirmation');
  });
  it('Should redirect to the confirmation page if clicked on the confirmation navigate link', async () => {
    const navigationLinks = screen.getAllByTestId('navigation-link');
    fireEvent.click(navigationLinks[1]);
    await waitFor(() => {
      expect(screen.queryByText('Inga bokning gjord!')).toBeInTheDocument();
    });
  });
  it('Should redirect to the booking page if clicked on the booking navigate link', () => {
    const navigationLinks = screen.getAllByTestId('navigation-link');
    fireEvent.click(navigationLinks[0]);
    expect(screen.queryByText('When, WHAT & Who')).toBeInTheDocument();
  });
});
