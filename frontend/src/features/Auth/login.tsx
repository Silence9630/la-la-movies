import { useState } from "react";
import { Link } from 'react-router-dom'

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);


const XIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L2.25 2.25h6.961l4.259 5.631 4.774-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

type OAuthProvider = "google" | "github" | "x";

const oauthProviders: { id: OAuthProvider; label: string; icon: React.ReactNode }[] = [
    { id: "google", label: "Continue with Google", icon: <GoogleIcon /> },
    { id: "x", label: "Continue with X", icon: <XIcon /> },
];

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // TODO: wire up your auth logic here
        setTimeout(() => setLoading(false), 1500);
    };

    const handleOAuth = (provider: OAuthProvider) => {
        setOauthLoading(provider);
        // TODO: redirect to OAuth provider
        setTimeout(() => setOauthLoading(null), 1500);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">

            <div className="w-full max-w-sm bg-card border border-border rounded-lg p-8">
                <div className="relative w-full h-44 overflow-hidden rounded-t-lg bg-[#1a1a2e]">
                    <img
                        src="https://i.ytimg.com/vi/-1TPL1DiMaw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4YFk-qsP116YMrCzgXWP-o4iBuw"
                        alt="City Maid Rwanda TV Series"
                        className="w-full h-full object-cover object-top opacity-85"
                    />
                </div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-foreground text-lg font-medium mb-1">Welcome back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to your account to continue.</p>
                </div>

                {/* OAuth buttons */}
                <div className="flex flex-col gap-2.5 mb-5">
                    {oauthProviders.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            onClick={() => handleOAuth(id)}
                            disabled={oauthLoading !== null || loading}
                            className="
                w-full flex items-center justify-center gap-2.5
                h-10 px-4 rounded-md
                bg-card border border-border
                text-foreground text-sm
                hover:bg-accent hover:text-accent-foreground
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-150
                active:scale-[0.98]
              "
                        >
                            {oauthLoading === id ? (
                                <Spinner />
                            ) : (
                                icon
                            )}
                            {label}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-muted-foreground text-xs">or sign in with email</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                {/* Email / Password form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-muted-foreground text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                h-10 px-3 rounded-md
                bg-input border border-border
                text-foreground text-sm
                placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                transition-shadow duration-150
              "
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-muted-foreground text-sm">
                                Password
                            </label>
                            <Link
                                to="/Auth/forgot-password"
                                className="text-primary text-xs hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                h-10 px-3 rounded-md
                bg-input border border-border
                text-foreground text-sm
                placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring
                transition-shadow duration-150
              "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || oauthLoading !== null}
                        className="
              mt-1 w-full h-10 rounded-md
              bg-primary text-primary-foreground
              text-sm font-medium
              hover:opacity-90
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.98]
              transition-all duration-150
              flex items-center justify-center gap-2
            "
                    >
                        {loading ? <Spinner light /> : "Sign in"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-muted-foreground text-sm mt-5">
                    Don't have an account?{" "}
                    <Link to="/Auth/signup" className="text-primary hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

function Spinner({ light = false }: { light?: boolean }) {
    return (
        <svg
            className={`animate-spin h-4 w-4 ${light ? "text-primary-foreground" : "text-muted-foreground"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
    );
}