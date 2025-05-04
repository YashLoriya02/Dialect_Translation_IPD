
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const Settings = () => {
  const { 
    theme, 
    toggleTheme, 
    outputType, 
    setOutputType,
    isAuthenticated 
  } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleClearHistory = () => {
    // In a real app, this would clear user history
    toast.success('History cleared successfully!');
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your app preferences</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme-toggle" className="text-base font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <div className="border-t pt-4"></div>
          
          {/* Output Type */}
          <div>
            <Label htmlFor="output-type" className="text-base font-medium">Default Output Type</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Choose how you want to receive translations
            </p>
            <Select
              value={outputType}
              onValueChange={(value) => setOutputType(value as 'text' | 'audio' | 'both')}
            >
              <SelectTrigger id="output-type" className="w-full">
                <SelectValue placeholder="Select output type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Only</SelectItem>
                <SelectItem value="audio">Audio Only</SelectItem>
                <SelectItem value="both">Both Text and Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border-t pt-4"></div>
          
          {/* Language Preferences */}
          <div>
            <Label htmlFor="input-lang" className="text-base font-medium">Preferred Input Language</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Set your primary input language (optional)
            </p>
            <Select defaultValue="auto">
              <SelectTrigger id="input-lang" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="pa">Punjabi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="output-lang" className="text-base font-medium">Preferred Output Language</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Set your primary output language
            </p>
            <Select defaultValue="en">
              <SelectTrigger id="output-lang" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="pa">Punjabi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border-t pt-4"></div>
          
          {/* History Management */}
          <div>
            <Label className="text-base font-medium">History Management</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Clear your conversation history
            </p>
            <Button variant="outline" onClick={handleClearHistory}>
              Clear History
            </Button>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleSaveSettings} className="ml-auto">
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
