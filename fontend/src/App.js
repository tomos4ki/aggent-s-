
import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h} hour${h !== 1 ? 's' : ''}${m > 0 ? `:${m} minute${m !== 1 ? 's' : ''}` : ''}`;
  }
}

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [minutes, setMinutes] = useState(() => {
    const stored = localStorage.getItem('usageMinutes');
    return stored ? parseInt(stored, 10) : 0;
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (user) {
      timerRef.current = setInterval(() => {
        setMinutes((prev) => {
          const next = prev + 1;
          localStorage.setItem('usageMinutes', next);
          return next;
        });
      }, 60000); // 1 minute
      return () => clearInterval(timerRef.current);
    }
  }, [user]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !password) {
      setError('Please enter both name and password.');
      return;
    }
    const newUser = { name, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setError('');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Register</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-semibold transition">Register</button>
            {error && <span className="text-red-600 text-sm text-center">{error}</span>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Welcome, {user.name}!</h2>
        <p className="mb-6 text-gray-700">Time used: <span className="font-mono text-blue-700">{formatTime(minutes)}</span></p>
        {/* Chat UI will go here next */}
        <div className="mt-8 text-gray-400 italic">
          Chat interface coming soon...
        </div>
      </div>
    </div>
  );
}

export default App;
