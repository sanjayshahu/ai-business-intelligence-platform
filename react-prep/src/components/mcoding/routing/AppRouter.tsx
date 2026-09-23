// AppRouter.tsx - Complete single file solution
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
  useSearchParams
} from 'react-router-dom';

// Custom hook for common routing operations
const useRouting = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const removeSearchParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return {
    params,
    navigate,
    location,
    searchParams,
    setSearchParams,
    updateSearchParam,
    removeSearchParam
  };
};

// Component using custom routing hook
const AdvancedSearch: React.FC = () => {
  const { searchParams, updateSearchParam, removeSearchParam } = useRouting();

  return (
    <div>
      <h2>Advanced Search</h2>
      <button onClick={() => updateSearchParam('sort', 'date')}>
        Sort by Date
      </button>
      <button onClick={() => updateSearchParam('sort', 'name')}>
        Sort by Name
      </button>
      <button onClick={() => removeSearchParam('sort')}>
        Clear Sort
      </button>
      <p>Current sort: {searchParams.get('sort') || 'none'}</p>
    </div>
  );
};

// Basic component
const Home: React.FC = () => {
  const location = useLocation();
  
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>Current path: {location.pathname}</p>
    </div>
  );
};

// Component with URL parameters
const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Showing profile for user ID: {userId}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate('/users')}>Go to Users</button>
    </div>
  );
};

// Component with search parameters
const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  const handleSearch = (newQuery: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', newQuery);
    setSearchParams(newParams);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <p>Searching for: {query}</p>
      <p>Category: {category}</p>
      <AdvancedSearch />
    </div>
  );
};

// Nested routes with Outlet
const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link> | 
        <Link to="settings">Settings</Link> | 
        <Link to="analytics">Analytics</Link>
      </nav>
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px 0' }}>
        <Outlet />
      </div>
    </div>
  );
};

const DashboardProfile: React.FC = () => {
  return <h3>Dashboard Profile</h3>;
};

const DashboardSettings: React.FC = () => {
  return <h3>Dashboard Settings</h3>;
};

const DashboardAnalytics: React.FC = () => {
  return <h3>Dashboard Analytics</h3>;
};

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated] = useState(true); // Simulate auth state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Login component with redirect
const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Simulate login
    const from = (location.state as any)?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// 404 Not Found component
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('404 page accessed');
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

// Lazy loaded component (simulated)
const LazyComponent: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    // Simulate lazy loading
    setTimeout(() => {
      setData('Lazy loaded content!');
    }, 1000);
  }, []);

  return (
    <div>
      <h2>Lazy Component</h2>
      <p>{data || 'Loading...'}</p>
    </div>
  );
};

// Main App component with all routing features
const AppRouter: React.FC = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h2>Navigation</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
            <li>
              <NavLink 
                to="/" 
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/users/123" 
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                User Profile
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/search?q=react&category=tech"
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Search
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard"
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/lazy"
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Lazy Component
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/login"
                style={({ isActive }) => ({ 
                  color: isActive ? 'red' : 'blue',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Basic route */}
          <Route path="/" element={<Home />} />
          
          {/* Route with parameters */}
          <Route path="/users/:userId" element={<UserProfile />} />
          
          {/* Route with search parameters */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
          </Route>
          
          {/* Protected route */}
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <div>
                  <h1>Protected Content</h1>
                  <p>This content requires authentication</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Lazy loaded route */}
          <Route path="/lazy" element={<LazyComponent />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirect */}
          <Route path="/old-path" element={<Navigate to="/" replace />} />
          
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;