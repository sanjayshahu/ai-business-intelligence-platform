import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './todo';

describe('Todo List Component', () => {
  // Test 1: Component renders correctly with initial todos
 test('renders todo list with initial items', () => {
  render(<App />);
  
  // ... previous assertions ...
  
  // Find the text element, then get its parent list item, then find the checkbox
  const bookText = screen.getByText('Read a book');
  // eslint-disable-next-line testing-library/no-node-access
  const bookListItem = bookText.closest('li');//.closest('li') searches up the DOM tree from bookText to find the nearest ancestor <li> element.

//This is useful if your book titles are inside a list item (<li>).
  expect(bookListItem).toBeDefined();
  const bookCheckbox = within(bookListItem!).getByRole('checkbox');//within() is a helper from Testing Library.

//It lets you scope queries to a specific element instead of searching the whole document.
//bookListItem! is a TypeScript non-null assertion (!), telling the compiler “this is definitely not null or undefined.”
  expect(bookCheckbox).toBeChecked();
  
  const dinnerText = screen.getByText('Cook dinner');
  // eslint-disable-next-line testing-library/no-node-access
  const dinnerListItem = dinnerText.closest('li');
  expect(dinnerListItem).toBeDefined();
  const dinnerCheckbox = within(dinnerListItem!).getByRole('checkbox');
  expect(dinnerCheckbox).toBeChecked();
  
  const exerciseText = screen.getByText('Exercise');
  // eslint-disable-next-line testing-library/no-node-access
  const exerciseListItem = exerciseText.closest('li');
  expect(exerciseListItem).toBeDefined();
  const exerciseCheckbox = within(exerciseListItem!).getByRole('checkbox');
  expect(exerciseCheckbox).not.toBeChecked();
  
  const meditationText = screen.getByText('Meditation');
  // eslint-disable-next-line testing-library/no-node-access
  const meditationListItem = meditationText.closest('li');
  expect(meditationListItem).toBeDefined();
  const meditationCheckbox = within(meditationListItem!).getByRole('checkbox');
  expect(meditationCheckbox).not.toBeChecked();
  
  const studyText = screen.getByText('Study JavaScript');
  // eslint-disable-next-line testing-library/no-node-access
  const studyListItem = studyText.closest('li');
  expect(studyListItem).toBeDefined();
  const studyCheckbox = within(studyListItem!).getByRole('checkbox');
  expect(studyCheckbox).not.toBeChecked();
});

  // Test 2: Adding a new todo
  test('adds a new todo when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get the input field and add button
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Type a new todo text
    await user.type(input, 'New test todo');
    
    // Click the add button
    await user.click(addButton);
    
    // Check if the new todo is added to the list
    expect(screen.getByText('New test todo')).toBeInTheDocument();
    
    // Verify the checkbox for the new todo is not checked (default status: false)
     const meditationText = screen.getByText('Meditation');
  // eslint-disable-next-line testing-library/no-node-access
  const meditationListItem = meditationText.closest('li');
  expect(meditationListItem).toBeDefined();
    const studyCheckbox = within(meditationListItem!).getByRole('checkbox');
  expect(studyCheckbox).not.toBeChecked();
    
    // Verify we now have 6 checkboxes (5 initial + 1 new)
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(6);
  });

  // Test 3: Adding a todo with empty input
  test('does not add todo when input is empty', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get the initial count of todos
    const initialCheckboxes = screen.getAllByRole('checkbox');
    const initialCount = initialCheckboxes.length;
    
    // Get the add button
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Try to add a todo with empty input
    await user.click(addButton);
    
    // Verify no new todo was added
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(initialCount);
  });

  // Test 4: Adding a todo with only whitespace
  test('does not add todo when input contains only whitespace', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get the initial count of todos
    const initialCheckboxes = screen.getAllByRole('checkbox');
    const initialCount = initialCheckboxes.length;
    
    // Get the input and add button
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Type only whitespace
    await user.type(input, '   ');
    
    // Try to add the todo
    await user.click(addButton);
    
    // Verify no new todo was added
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(initialCount);
  });

  // Test 5: Toggling todo status
  test('toggles todo status when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
     const meditationText = screen.getByText('Meditation');
    // Get a todo checkbox that is initially unchecked
    // eslint-disable-next-line testing-library/no-node-access
    const meditationListItem = meditationText.closest('li');
  expect(meditationListItem).toBeDefined();
    const meditationCheckbox = within(meditationListItem!).getByRole('checkbox');
  expect(meditationCheckbox).not.toBeChecked()
    
    
    // Click the checkbox
    await user.click(meditationCheckbox);
    
    // Verify it's now checked
    expect(meditationCheckbox).toBeChecked();
    
    // Click it again
    await user.click(meditationCheckbox);
    
    // Verify it's unchecked again
    expect(meditationCheckbox).not.toBeChecked();
  });

  // Test 6: Deleting a todo
  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get initial count of todos
    const initialCheckboxes = screen.getAllByRole('checkbox');
    const initialCount = initialCheckboxes.length;
    
    // Get the delete button for the first todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    // Click the first delete button
    await user.click(deleteButtons[0]);
    
    // Verify the todo was deleted (count decreased by 1)
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(initialCount - 1);
    
    // Verify the deleted todo is no longer in the document
    expect(screen.queryByText('Exercise')).not.toBeInTheDocument();
  });

  // Test 7: Adding todo by pressing Enter key
  test('adds a new todo when Enter key is pressed in input', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get the input field
    const input = screen.getByRole('textbox');
    
    // Type a new todo and press Enter
    await user.type(input, 'New todo with enter{enter}');
    
   
      // eslint-disable-next-line testing-library/await-async-query
      const nteText = await screen.findByText('New todo with enter');
    // Get a todo checkbox that is initially unchecked
    // eslint-disable-next-line testing-library/no-node-access
    const ntetItem = (await nteText).closest('li');
  expect(ntetItem).toBeDefined();
    
    // Verify we have one more checkbox than initially
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(6); // 5 initial + 1 new
  });

  // Test 8: Input field clears after adding a todo
  test('clears input field after adding a todo', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Get the input field
    const input = screen.getByRole('textbox');
    
    // Type a new todo
    await user.type(input, 'Test clear input');
    
    // Verify input has the value
    expect(input).toHaveValue('Test clear input');
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);
    
    // Verify input is cleared
    expect(input).toHaveValue('');
  });
});