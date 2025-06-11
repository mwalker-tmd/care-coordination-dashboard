import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('renders the dashboard title', () => {
    render(<App />);
    expect(screen.getByText('Care Coordination Dashboard')).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Care Coordination Dashboard/)).toBeInTheDocument();
  });
}); 