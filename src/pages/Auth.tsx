
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { ArrowLeft, Loader2, User, Mail, Lock } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Auth = () => {
//   const { signIn, signUp, user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const [signInData, setSignInData] = useState({
//     email: '',
//     password: ''
//   });

//   const [signUpData, setSignUpData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     fullName: ''
//   });

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!signInData.email || !signInData.password) {
//       setError('Please fill in all fields');
//       setLoading(false);
//       return;
//     }

//     const { error } = await signIn(signInData.email, signInData.password);
    
//     if (error) {
//       setError(error.message);
//     }
    
//     setLoading(false);
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     if (!signUpData.email || !signUpData.password || !signUpData.fullName) {
//       setError('Please fill in all fields');
//       setLoading(false);
//       return;
//     }

//     if (signUpData.password !== signUpData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     if (signUpData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       setLoading(false);
//       return;
//     }

//     const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
    
//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess('Account created successfully! You can now sign in.');
//       setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' });
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="mb-6">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Button>
//         </div>

//         <Card>
//           <CardHeader className="text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <User className="w-8 h-8 text-blue-600" />
//             </div>
//             <CardTitle className="text-2xl">Task Manager</CardTitle>
//             <p className="text-gray-600">Manage your tasks efficiently</p>
//           </CardHeader>

//           <CardContent>
//             <Tabs defaultValue="signin" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="signin">Sign In</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>

//               {error && (
//                 <Alert className="mt-4 border-red-200 bg-red-50">
//                   <AlertDescription className="text-red-700">{error}</AlertDescription>
//                 </Alert>
//               )}

//               {success && (
//                 <Alert className="mt-4 border-green-200 bg-green-50">
//                   <AlertDescription className="text-green-700">{success}</AlertDescription>
//                 </Alert>
//               )}

//               <TabsContent value="signin" className="space-y-4">
//                 <form onSubmit={handleSignIn} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signin-email">Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signin-email"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={signInData.email}
//                         onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="signin-password">Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signin-password"
//                         type="password"
//                         placeholder="Enter your password"
//                         value={signInData.password}
//                         onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Signing In...
//                       </>
//                     ) : (
//                       'Sign In'
//                     )}
//                   </Button>
//                 </form>
//               </TabsContent>

//               <TabsContent value="signup" className="space-y-4">
//                 <form onSubmit={handleSignUp} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-name">Full Name</Label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-name"
//                         type="text"
//                         placeholder="Enter your full name"
//                         value={signUpData.fullName}
//                         onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="signup-email">Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-email"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={signUpData.email}
//                         onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="signup-password">Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-password"
//                         type="password"
//                         placeholder="Create a password"
//                         value={signUpData.password}
//                         onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="signup-confirm">Confirm Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="signup-confirm"
//                         type="password"
//                         placeholder="Confirm your password"
//                         value={signUpData.confirmPassword}
//                         onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating Account...
//                       </>
//                     ) : (
//                       'Create Account'
//                     )}
//                   </Button>
//                 </form>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!signInData.email || !signInData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!signUpData.email || !signUpData.password || !signUpData.fullName) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Account created successfully! You can now sign in.');
      setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-indigo-600" />
            </div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Task Manager
            </CardTitle>
            <p className="text-gray-700 mt-2">Manage your tasks efficiently</p>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger 
                  value="signin"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50 backdrop-blur-sm">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mt-4 border-green-200 bg-green-50 backdrop-blur-sm">
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-gray-700">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="pl-10 bg-white/90 border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;