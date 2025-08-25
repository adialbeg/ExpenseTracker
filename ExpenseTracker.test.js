import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('form inputs reset after adding an expense', () => {
    render(<App />);

    // Fill in description, amount and category
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Coffee' } });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '15' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Other' } });
});
// maybe add a mock to make sure that the data is added the way you think it does

