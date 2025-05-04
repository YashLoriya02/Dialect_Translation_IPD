
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      {/* Logo Section */}
      <div className="mb-8 animate-pulse">
        <div className="h-24 w-24 bg-gradient-to-br from-brand to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-4xl font-bold text-white">T</span>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-blue-500 bg-clip-text text-transparent mb-2">
        TransLingo AI
      </h1>

      {/* Tagline */}
      <p className="text-lg text-muted-foreground mb-10">
        Translate & Detect Dialects, Effortlessly.
      </p>

      {/* Auth Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Button 
          onClick={() => navigate('/login')} 
          className="w-full flex items-center justify-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
        
        <Button 
          onClick={() => navigate('/login?signup=true')} 
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-12">
        © 2025 TransLingo AI. All rights reserved.
      </p>
    </div>
  );
};

export default Landing;
