import { beforeEach, it, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Booking from './Booking';
import router from '../router';
import { RouterProvider } from 'react-router-dom';

describe('Testing Booking page', () => {
  beforeEach(() => {
    render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
  });

  it(' Should have input fields for date, time, number of players, and number of lanes', () => {
    expect(screen.getByTestId('when')).toBeInTheDocument();

    expect(screen.getByTestId('time')).toBeInTheDocument();

    expect(screen.getByTestId('people')).toBeInTheDocument();

    expect(screen.getByTestId('lanes')).toBeInTheDocument();
  });

  it('Should show the error message if any field is unfilled after I press the submit button.', async () => {
    fireEvent.change(screen.getByTestId('when'), {
      target: { value: '2023-11-27' },
    });
    fireEvent.change(screen.getByTestId('time'), {
      target: { value: '212321' },
    });
    fireEvent.change(screen.getByTestId('people'), { target: { value: 1 } });

    //missing typing value for the lanes field
    const times = 1;
    for (let index = 0; index < times; index++) {
      fireEvent.click(screen.getByText('+'));
    }
    fireEvent.click(screen.getByText('strIIIIIike!'));

    const errorMessage = screen.queryByText(
      'Fill out all the fields and make sure that people and shoes is the same number.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('Should show the error message if something is wrong after pressing the submit button.', () => {
    fireEvent.click(screen.getByText('strIIIIIike!'));

    expect(
      screen.getByText(
        'Fill out all the fields and make sure that people and shoes is the same number.'
      )
    ).toBeInTheDocument();
  });
  it('Should show an error message if  the total of the shoes is not the same as the total of the people', async () => {
    fireEvent.change(screen.getByTestId('when'), {
      target: { value: '2023-11-27' },
    });
    fireEvent.change(screen.getByTestId('time'), {
      target: { value: '212321' },
    });
    fireEvent.change(screen.getByTestId('people'), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId('lanes'), {
      target: { value: 1 },
    });

    const times = 2;
    for (let index = 0; index < times; index++) {
      fireEvent.click(screen.getByText('+'));
    }
    fireEvent.click(screen.getByText('strIIIIIike!'));

    const errorMessage = screen.queryByText(
      'Fill out all the fields and make sure that people and shoes is the same number.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('Should show an input field for typing shoe size when clicking on the plus button', () => {
    fireEvent.click(screen.getByText('+'));
    expect(screen.getAllByTestId('shoes').length).toBe(1);
  });

  it('Should be able to remove an input field for shoe size when clicking on the minus icon', () => {
    fireEvent.click(screen.getByText('+'));
    expect(screen.getAllByTestId('shoes').length).toBe(1);
    fireEvent.click(screen.getByText('-'));
    expect(screen.queryAllByTestId('shoes').length).toBe(0);
  });

  it('Should navigate to the confirmation page if calling Api successfully', async () => {
    const fetch = vi.spyOn(window, 'fetch');
    fireEvent.change(screen.getByTestId('when'), {
      target: { value: '2023-11-27' },
    });
    fireEvent.change(screen.getByTestId('time'), {
      target: { value: '212321' },
    });
    fireEvent.change(screen.getByTestId('people'), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId('lanes'), {
      target: { value: 1 },
    });
    fireEvent.click(screen.getByText('+'));
    const shoesFields = screen.queryAllByTestId('shoes');
    for (let index = 0; index < shoesFields.length; index++) {
      fireEvent.change(shoesFields[index].querySelector('input[type="text"]'), {
        target: { value: 40 },
      });
    }
    fireEvent.click(screen.getByText('strIIIIIike!'));
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByTestId('booking-number').value).toBe('STR9883PCKL');
    });
  });
});
