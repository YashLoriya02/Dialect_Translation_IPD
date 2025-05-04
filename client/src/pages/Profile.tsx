
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Edit, LogOut } from 'lucide-react';

const Profile = () => {
  const { isAuthenticated, user, logout } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const joinedDate = user.joinedDate 
    ? new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(user.joinedDate) 
    : 'Unknown';

  // Mock conversation history
  const recentConversations = [
    {
      id: '1',
      snippet: 'Translation from Varhadi: Hello, how are you?',
      date: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '2',
      snippet: 'Translation from Marathi: What is your name?',
      date: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '3',
      snippet: 'Translation from Telugu: How is the weather today?',
      date: new Date(Date.now() - 172800000) // 2 days ago
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoUrl} />
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">Joined: {joinedDate}</p>
            </div>
            
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          <CardDescription>Your recent translation history</CardDescription>
        </CardHeader>
        
        <CardContent>
          {recentConversations.length > 0 ? (
            <div className="space-y-4">
              {recentConversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className="p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <p className="font-medium">{conversation.snippet}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.DateTimeFormat('en-US', { 
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    }).format(conversation.date)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">
              No recent activity
            </p>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            New Translation
          </Button>
          
          <Button variant="destructive" size="sm" onClick={logout} className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
