import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home route content', () => {
  render(<App />);
  expect(screen.getByText(/accordion/i)).toBeInTheDocument();
});
  