
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { LogIn, UserPlus, ArrowLeft, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useApp();

  const searchParams = new URLSearchParams(location.search);
  const showSignupParam = searchParams.get('signup');

  const [isLogin, setIsLogin] = useState(!showSignupParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newUrl = isLogin
      ? '/login'
      : '/login?signup=true';

    window.history.replaceState({}, '', newUrl);
  }, [isLogin]);

  const validateForm = () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!password) {
      toast.error('Password is required');
      return false;
    }

    if (!isLogin) {
      if (!name.trim()) {
        toast.error('Name is required');
        return false;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    if (isLogin) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })

        if (response.status === 200) {
          setIsAuthenticated(true);
          setLoading(false);
          navigate('/')
          toast.success('Successfully logged in!');
        }
        else {
          setLoading(false);
          toast.error('Invalid Credentials');
        }
      } catch (error) {
        setLoading(false);
        console.log(error)
        toast.error("Internal Server Error")
      }
    }
    else {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        })

        if (response.status === 201) {
          setIsAuthenticated(true);
          setLoading(false);
          toast.success('Registered Successfully!');
          navigate('/')
        }
        else if (response.status === 400) {
          setIsAuthenticated(true);
          setLoading(false);
          toast.error('User already exists');
        }
        else {
          setLoading(false);
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.log(error)
        setLoading(false);
        toast.error("Internal Server Error")
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="h-8 w-8 absolute top-4 left-4"
            >
              <ArrowLeft size={18} />
            </Button>

            <CardTitle className="text-2xl mx-auto">
              {isLogin ? 'Welcome back' : 'Create account'}
            </CardTitle>
          </div>

          <CardDescription className="text-center">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Create a new account to get started with TransLingo AI'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your Alias"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? <div className='flex gap-5 items-center'>
                  <Loader2 className="w-4 mt-[2px] h-4 animate-spin" />
                  <span className='text-[16px]'>Processing...</span>
                </div>
                : isLogin ? (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </span>
                )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              {" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setIsLogin(!isLogin)}
                type="button"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
