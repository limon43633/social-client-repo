import React, { useState, useEffect, createContext, useContext } from 'react';


export const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => { console.error("Login called outside AuthProvider"); },
  logout: () => { console.error("Logout called outside AuthProvider"); }
});

// Custom hook to easily consume the Auth context
export const useAuth = () => useContext(AuthContext);

// 2. Auth Provider Component
export const AuthProvider = ({ children }) => {
  // Replace this with actual Firebase user state in your full project
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Mock user data setup
  useEffect(() => {
    // Simulate checking local storage for a logged-in state
    const loggedInUser = JSON.parse(localStorage.getItem('mockUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoading(false);
    // You would integrate Firebase onAuthStateChanged here in a real project
  }, []);

  const login = () => {
    // Mock login logic
    const mockUser = { 
      displayName: 'Volunteer Hero', 
      email: 'hero@example.com', 
      photoURL: 'https://placehold.co/40x40/4F46E5/FFFFFF/png?text=VH' 
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
    // In a real app, you would show a toast here
    console.log("Logged in successfully!");
  };

  const logout = () => {
    // Mock logout logic
    localStorage.removeItem('mockUser');
    setUser(null);
    // In a real app, you would show a toast here
    console.log("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- THEME CONTEXT (Challenge Requirement #3) ---

// 3. Theme Context Creation
// FIX: Providing a default object for safety.
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { console.error("ToggleTheme called outside ThemeProvider"); }
});

// Custom hook to easily consume the Theme context
export const useTheme = () => useContext(ThemeContext);

// 4. Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // light or dark

  useEffect(() => {
    // Initialize theme from local storage or default to 'light'
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    // Apply theme class to the HTML element for Tailwind CSS dark mode support
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};