import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import SearchFilter from './components/SearchFilter';
import { getDevelopers, addDeveloper } from './services/api';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', role: '' });

  const fetchDevelopers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDevelopers();
      setDevelopers(response.data);
      setFilteredDevelopers(response.data);
    } catch (error) {
      toast.error('Failed to fetch developers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  useEffect(() => {
    let result = [...developers];
    
    if (filters.role) {
      result = result.filter(dev => dev.role === filters.role);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(dev => 
        dev.name.toLowerCase().includes(searchLower) ||
        dev.techStack.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredDevelopers(result);
  }, [developers, filters]);

  const handleAddDeveloper = async (developerData) => {
    try {
      const response = await addDeveloper(developerData);
      setDevelopers(prev => [...prev, response.data]);
      toast.success('Developer added successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add developer');
      return false;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Developer Directory</h1>
            </div>
            <p className="tagline">Find and connect with talented developers</p>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container">
          <div className="grid-layout">
            <aside className="sidebar">
              <DeveloperForm onSubmit={handleAddDeveloper} />
            </aside>
            
            <section>
              <SearchFilter filters={filters} onFilterChange={handleFilterChange} />
              <DeveloperList developers={filteredDevelopers} loading={loading} />
            </section>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Developer Directory. Built with React & Node.js</p>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
