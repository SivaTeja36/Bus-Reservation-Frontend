import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Layout from './components/Layout';
import Tickets from './pages/Tickets';
import Buses from './pages/Buses';
import Companies from './pages/Companies';
import Branches from './pages/Branches';
import Users from './pages/Users';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/tickets" replace />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="buses" element={<Buses />} />
            <Route path="companies" element={<Companies />} />
            <Route path="branches" element={<Branches />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;