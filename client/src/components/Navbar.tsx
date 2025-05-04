
import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Settings, User, LogIn, LogOut, Moon, Sun, Youtube, BookOpenText } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, toggleTheme, theme, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand to-blue-500 bg-clip-text text-transparent">TransLingo AI</span>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" title="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/search" title="Youtube Video Recommendation">
              <Youtube className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/blogs" title="Blogs Recommendation">
              <BookOpenText className="h-5 w-5" />
            </Link>
          </Button>

          {/* <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button> */}

          {isAuthenticated ? (
            <Button variant="outline" onClick={logout} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex items-center gap-1">
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
