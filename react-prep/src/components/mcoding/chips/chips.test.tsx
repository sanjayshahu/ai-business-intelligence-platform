import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from './chips';

describe('Chip Component', () => {
  // Test 1: Component renders correctly with initial state
  test('renders chip component with initial state', () => {
    render(<Chip />);
    
    // Check if main heading is rendered
    expect(screen.getByText('Chip Inputs')).toBeInTheDocument();
    
    // Check if input element is present
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    
    // Verify no chips are rendered initially
    const chips = screen.queryAllByText(/X/);
    expect(chips).toHaveLength(0);
  });

  // Test 2: Input value updates correctly
  test('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<Chip />);
    
    const inputElement = screen.getByRole('textbox');
    
    // Type into the input
    await user.type(inputElement, 'test chip');
    
    // Verify input value is updated
    expect(inputElement).toHaveValue('test chip');
  });

  // Test 3: Adds chip on Enter key press
  test('adds chip when Enter key is pressed with non-empty input', async () => {
    const user = userEvent.setup();
    render(<Chip />);
    
    const inputElement = screen.getByRole('textbox');
    
    // Type and press Enter
    await user.type(inputElement, 'first chip{enter}');
    
    // Verify chip is added
    expect(screen.getByText('first chip')).toBeInTheDocument();
    expect(inputElement).toHaveValue(''); // Input should be cleared
    
    // Add another chip
    await user.type(inputElement, 'second chip{enter}');
    expect(screen.getByText('second chip')).toBeInTheDocument();
    expect(screen.getAllByText(/chip/)).toHaveLength(2);
  });

  // Test 4: Does not add chip with empty input
  test('does not add chip when Enter is pressed with empty input', async () => {
    const user = userEvent.setup();
    render(<Chip />);
    
    const inputElement = screen.getByRole('textbox');
    
    // Press Enter with empty input
    await user.type(inputElement, '{enter}');
    
    // No chips should be added
    expect(screen.queryAllByText(/X/)).toHaveLength(0);
    
    // Type spaces and press Enter
    await user.type(inputElement, '   {enter}');
    
    // Still no chips should be added (trimmed empty string)
    expect(screen.queryAllByText(/X/)).toHaveLength(0);
  });

  // Test 5: Removes chip when X is clicked
  test('removes chip when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<Chip />);
    
    const inputElement = screen.getByRole('textbox');
    
    // Add chips
    await user.type(inputElement, 'chip1{enter}');
    await user.type(inputElement, 'chip2{enter}');
    await user.type(inputElement, 'chip3{enter}');
    
    // Verify chips are added
    expect(screen.getAllByText(/X/)).toHaveLength(3);
    
    // Remove the second chip
    const deleteButtons = screen.getAllByText('X');
    await user.click(deleteButtons[1]); // Click second delete button
    
    // Verify chip is removed
    expect(screen.getAllByText(/X/)).toHaveLength(2);
    expect(screen.queryByText('chip2')).not.toBeInTheDocument();
    expect(screen.getByText('chip1')).toBeInTheDocument();
    expect(screen.getByText('chip3')).toBeInTheDocument();
  });

  // Test 6: Handles multiple operations correctly
test.only('handles adding and removing multiple chips correctly', async () => {
  const user = userEvent.setup();
  render(<Chip />);
  
  const inputElement = screen.getByRole('textbox');
  
  // Add multiple chips
  const chipsToAdd = ['apple', 'banana', 'cherry', 'date'];
  for (const chip of chipsToAdd) {
    await user.type(inputElement, `${chip}{enter}`);
  }

  // Verify all chips are added
  expect(screen.getAllByText('X', { selector: 'span' })).toHaveLength(4);

  // Remove "apple"
  let deleteButtons = screen.getAllByText('X', { selector: 'span' });
  await user.click(deleteButtons[0]);//once apple deleted

  // Remove "cherry" (must re-query after DOM changes)
  deleteButtons = screen.getAllByText('X', { selector: 'span' });//requery again[b,c,d]
  await user.click(deleteButtons[1]); // now index 1 is "cherry"//now cherry deleted

  // Verify correct chips remain
  expect(screen.getAllByText('X', { selector: 'span' })).toHaveLength(2);
  expect(screen.getByText('banana')).toBeInTheDocument();
  expect(screen.getByText('date')).toBeInTheDocument();
  expect(screen.queryByText('apple')).not.toBeInTheDocument();
  expect(screen.queryByText('cherry')).not.toBeInTheDocument();
});


  // Test 7: Input trims whitespace from chips
  test('trims whitespace from chip text', async () => {
    const user = userEvent.setup();
    render(<Chip />);
    
    const inputElement = screen.getByRole('textbox');
    
    // Add chip with leading/trailing spaces
    await user.type(inputElement, '   trimmed chip   {enter}');
    
    // Verify chip is added without extra spaces
    expect(screen.getByText('trimmed chip')).toBeInTheDocument();
    expect(screen.queryByText('   trimmed chip   ')).not.toBeInTheDocument();
  });
});