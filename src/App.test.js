import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const renderWithQueryClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

test('renders Weather App title', () => {
  renderWithQueryClient(<App />);
  const titleElement = screen.getByText(/Weather App/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders default cities as tabs', () => {
  renderWithQueryClient(<App />);
  expect(screen.getByText(/Rio de Janeiro/i)).toBeInTheDocument();
  expect(screen.getByText(/Beijing/i)).toBeInTheDocument();
  expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();
});

test('selects a city tab', () => {
  renderWithQueryClient(<App />);
  const beijingTab = screen.getByText(/Beijing/i);
  fireEvent.click(beijingTab);
  
  // Check if the clicked tab is now selected
  expect(beijingTab).toHaveClass('bg-blue-600');
});

test('adds a new city and selects it', () => {
  renderWithQueryClient(<App />);
  const newCityInput = screen.getByPlaceholderText(/Enter city name/i);
  const addCityButton = screen.getByText(/Add City/i);
  
  // Add a new city
  fireEvent.change(newCityInput, { target: { value: 'New York' } });
  fireEvent.click(addCityButton);
  
  // Check if the new city tab is added and selected
  expect(screen.getByText(/New York/i)).toBeInTheDocument();
  expect(screen.getByText(/New York/i)).toHaveClass('bg-blue-600'); // Check if it's selected
});
