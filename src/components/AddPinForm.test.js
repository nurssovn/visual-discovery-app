import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddPinForm from './AddPinForm';

describe('AddPinForm', () => {
  it('shows validation error when fields are empty', () => {
    const onAdd = jest.fn();
    const onClose = jest.fn();

    render(<AddPinForm onAdd={onAdd} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    expect(screen.getByText(/добавьте ссылку/i)).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('submits pin data when form is valid', async () => {
    const onAdd = jest.fn().mockResolvedValue(true);
    const onClose = jest.fn();

    render(<AddPinForm onAdd={onAdd} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('https://...'), {
      target: { value: 'https://example.com/img.jpg' },
    });
    fireEvent.change(screen.getByPlaceholderText('Добавить название'), {
      target: { value: 'Test Pin' },
    });

    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          image: 'https://example.com/img.jpg',
          title: 'Test Pin',
          category: 'art',
        })
      );
    });
  });
});
