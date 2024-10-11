(<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
  <h2 className="text-3xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
  <form onSubmit={handleEmailAuth} className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : isLogin ? (
        'Login'
      ) : (
        'Sign Up'
      )}
    </Button>
  </form>
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
    </div>
  </div>
  <Button variant="outline" className="w-full" onClick={handleGoogleAuth} disabled={isLoading}>
    {isLoading ? (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      <>
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </>
    )}
  </Button>
  {error && <p className="text-sm text-red-500 text-center">{error}</p>}
  <p className="text-sm text-center">
    {isLogin ? "Don't have an account? " : "Already have an account? "}
    <Button variant="link" className="p-0" onClick={() => setIsLogin(!isLogin)}>
      {isLogin ? 'Sign Up' : 'Login'}
    </Button>
  </p>
</div>
</div>
)