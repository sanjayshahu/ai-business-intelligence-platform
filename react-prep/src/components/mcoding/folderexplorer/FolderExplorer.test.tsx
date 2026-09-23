// List.test.tsx
import React from 'react';
import { render, screen, fireEvent, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom';
import {FE,List} from './FolderExplorer';




// Mock the JSON import
jest.mock('./data.json', () => [//always add mock data directly here,,
  {
    id: 1,
    name: 'Folder 1',
    isFolder: true,
    children: [
      {
        id: 2,
        name: 'File 1-1',
        isFolder: false
      },
      {
        id: 3,
        name: 'Folder 1-1',
        isFolder: true,
        children: [
          {
            id: 4,
            name: 'File 1-1-1',
            isFolder: false
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'File 2',
    isFolder: false
  }
]);

describe('FE Component', () => {
  test('renders FE component with data from JSON', () => {
    // Render the main FE component
    render(<FE />);
    
    // Verify that the root elements are rendered
    expect(screen.getByText('Folder 1')).toBeInTheDocument();
    expect(screen.getByText('File 2')).toBeInTheDocument();
  });
});

describe('List Component', () => {
  // Test 1: Basic rendering with empty data
  test('renders nothing when data is empty', () => {
    render(<List data={[]} />);
    
    // For empty data, we should only have the wrFEer div
    // Check that no folder icons or file names are rendered
    expect(screen.queryByText('📁')).not.toBeInTheDocument();
    expect(screen.queryByText('📂')).not.toBeInTheDocument();
  });

  // Test 2: Rendering files and folders correctly
  test('renders files and folders with correct structure', () => {
    const testData = [
      {
        id: 1,
        name: 'Test Folder',
        isFolder: true,
        children: []
      },
      {
        id: 2,
        name: 'Test File',
        isFolder: false
      }
    ];

    render(<List data={testData} />);

    // Both items should be rendered
    expect(screen.getByText('Test Folder')).toBeInTheDocument();
    expect(screen.getByText('Test File')).toBeInTheDocument();

    // Folder should have folder icon
    const folderIcon = screen.getByText('📁');
    expect(folderIcon).toBeInTheDocument();

    // File should not have any folder icon
    const fileElement = screen.getByText('Test File');
    // The file name should be directly rendered without preceding icon
    expect(fileElement).toBeInTheDocument();
  });

  // Test 3: Folder expansion and collapse functionality
  test('toggles folder expansion when folder icon is clicked', () => {
    const testData = [
      {
        id: 1,
        name: 'Parent Folder',
        isFolder: true,
        children: [
          {
            id: 2,
            name: 'Child File',
            isFolder: false
          }
        ]
      }
    ];

    render(<List data={testData} />);

    // Initially, child should not be visible
    expect(screen.queryByText('Child File')).not.toBeInTheDocument();

    // Find and click the folder icon to expand
    const folderIcon = screen.getByText('📁');
    fireEvent.click(folderIcon);

    // After click, folder should be expanded and child visible
    expect(screen.getByText('📂')).toBeInTheDocument(); // Open folder icon
    expect(screen.getByText('Child File')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(screen.getByText('📂'));

    // Should be back to closed state
    expect(screen.getByText('📁')).toBeInTheDocument();
    expect(screen.queryByText('Child File')).not.toBeInTheDocument();
  });

  // Test 4: Nested folder structure
  test('handles nested folder structures correctly', () => {
    const nestedData = [
      {
        id: 1,
        name: 'Level 1 Folder',
        isFolder: true,
        children: [
          {
            id: 2,
            name: 'Level 2 Folder',
            isFolder: true,
            children: [
              {
                id: 3,
                name: 'Level 3 File',
                isFolder: false
              }
            ]
          }
        ]
      }
    ];

    render(<List data={nestedData} />);

    // Level 1 folder should be visible
    expect(screen.getByText('Level 1 Folder')).toBeInTheDocument();
    
    // Level 2 and 3 should not be visible initially
    expect(screen.queryByText('Level 2 Folder')).not.toBeInTheDocument();
    expect(screen.queryByText('Level 3 File')).not.toBeInTheDocument();

    // Expand Level 1 folder
    fireEvent.click(screen.getByText('📁'));
    
    // Level 2 should now be visible
    expect(screen.getByText('Level 2 Folder')).toBeInTheDocument();
    expect(screen.queryByText('Level 3 File')).not.toBeInTheDocument();

    // Expand Level 2 folder
    fireEvent.click(screen.getByText('📁'));
    
    // Level 3 should now be visible
    expect(screen.getByText('Level 3 File')).toBeInTheDocument();
  });

  // Test 5: Edge case - folder with empty children array
test('does not render children for folder with empty children array', () => {
  const testData = [
    {
      id: 1,
      name: 'Empty Folder',
      isFolder: true,
      children: []
    }
  ];

  const { container } = render(<List data={testData} />);

  console.log('--- Roles before click ---');
  logRoles(container);
// idea:  There are no semantic HTML roles here: all elements are <div> and <span>.

// By default, Testing Library treats these as role="generic", but logRoles only prints roles that are considered “accessible” (like button, list, listitem, textbox, etc.).

// So if your folder structure is all <div>/<span> with no role attribute, logRoles will print almost nothing.

  console.log('--- DOM before click ---');
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();

  // Click to expand the folder
  fireEvent.click(screen.getByText('📁'));

  console.log('--- Roles after click ---');
  logRoles(container);

  console.log('--- DOM after click ---');
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();

  // Folder icon should change to expanded state
  expect(screen.getByText('📂')).toBeInTheDocument();

  // Folder name should be visible
  expect(screen.getByText('Empty Folder')).toBeInTheDocument();

  // No children should be rendered since children array is empty
  expect(screen.queryByText(/File/i)).not.toBeInTheDocument();
});


  // Test 6: Folder with undefined children property
  test('handles folder with undefined children property', () => {
    const testData = [
      {
        id: 1,
        name: 'No Children Folder',
        isFolder: true
        // children property is intentionally undefined
      }
    ];

    render(<List data={testData} />);

    // Click to expand - should not crash
    fireEvent.click(screen.getByText('📁'));

    // Should show expanded icon
    expect(screen.getByText('📂')).toBeInTheDocument();
    
    // No errors should occur and no additional content should FEear
  });

  // Test 7: Multiple folders at same level
  test('maintains separate expansion states for multiple folders', () => {
    const testData = [
      {
        id: 1,
        name: 'Folder A',
        isFolder: true,
        children: [{ id: 2, name: 'File A1', isFolder: false }]
      },
      {
        id: 3,
        name: 'Folder B',
        isFolder: true,
        children: [{ id: 4, name: 'File B1', isFolder: false }]
      }
    ];

    render(<List data={testData} />);

    // Get all folder icons
    const folderIcons = screen.getAllByText('📁');
    expect(folderIcons).toHaveLength(2);

    // Expand first folder only
    fireEvent.click(folderIcons[0]);

    // Only first folder's children should be visible
    expect(screen.getByText('File A1')).toBeInTheDocument();
    expect(screen.queryByText('File B1')).not.toBeInTheDocument();

    // Expand second folder
    fireEvent.click(folderIcons[1]);

    // Both folders' children should be visible
    expect(screen.getByText('File A1')).toBeInTheDocument();
    expect(screen.getByText('File B1')).toBeInTheDocument();
  });

  // Test 8: Clicking on file name does nothing
  test('clicking on file name does not trigger expansion', () => {
    const testData = [
      {
        id: 1,
        name: 'Test File',
        isFolder: false
      }
    ];

    render(<List data={testData} />);

    const fileName = screen.getByText('Test File');
    
    // Click on the file name
    fireEvent.click(fileName);

    // No changes should occur - verify file is still there
    expect(screen.getByText('Test File')).toBeInTheDocument();
  });

  // Test 9: Complex nested structure with mixed types
test('handles complex nested structures correctly', () => {
  const mockData = [
    {
      id: 1,
      name: 'Folder 1',
      isFolder: true,
      children: [
        { id: 2, name: 'File 1-1', isFolder: false },
        {
          id: 3,
          name: 'Folder 1-1',
          isFolder: true,
          children: [
            { id: 4, name: 'File 1-1-1', isFolder: false }
          ]
        }
      ]
    },
    { id: 5, name: 'File 2', isFolder: false }
  ];

  render(<List data={mockData} />);

  // Initial state - only root items visible
  expect(screen.getByText('Folder 1')).toBeInTheDocument();
  expect(screen.getByText('File 2')).toBeInTheDocument();
  expect(screen.queryByText('File 1-1')).not.toBeInTheDocument();

  // Expand Folder 1
  fireEvent.click(screen.getByText('📁'));

  // First level children should be visible
  expect(screen.getByText('File 1-1')).toBeInTheDocument();
  expect(screen.getByText('Folder 1-1')).toBeInTheDocument();
  expect(screen.queryByText('File 1-1-1')).not.toBeInTheDocument();

  // Expand Folder 1-1
  fireEvent.click(screen.getByText('📁'));

  // Nested file should be visible
  expect(screen.getByText('File 1-1-1')).toBeInTheDocument();
});


  // Test 10: Accessibility and role testing
  test('has proper accessibility attributes', () => {
    const testData = [
      {
        id: 1,
        name: 'Accessible Folder',
        isFolder: true,
        children: [{ id: 2, name: 'Nested File', isFolder: false }]
      }
    ];

    render(<List data={testData} />);

    // Folder icon should have cursor pointer style (indicated by inline style)
    const folderIcon = screen.getByText('📁');
    expect(folderIcon).toHaveStyle('cursor: pointer');
    expect(folderIcon).toHaveStyle('margin-right: 5px');
  });
});