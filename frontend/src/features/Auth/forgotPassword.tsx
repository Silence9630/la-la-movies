import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

// ─── Icons ───────────────────────────────────────────────────────────────────

const ArrowLeftIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {open ? (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </>
        ) : (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        )}
    </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

type StrengthLevel = { label: string; color: string; width: string };

function getStrength(password: string): StrengthLevel | null {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels: StrengthLevel[] = [
        { label: "Weak", color: "#E24B4A", width: "25%" },
        { label: "Fair", color: "#EF9F27", width: "50%" },
        { label: "Good", color: "#378ADD", width: "75%" },
        { label: "Strong", color: "#1D9E75", width: "100%" },
    ];
    return levels[score - 1] ?? levels[0];
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

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

function BackLink({ onClick }: { onClick: () => void }) {
    return (
        <div className="mt-4 text-center">
            <button
                type="button"
                onClick={onClick}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeftIcon />
                Back
            </button>
        </div>
    );
}

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
    return (
        <div className="flex items-center gap-1.5 mb-5">
            {[1, 2, 3].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-none">
                    <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${step > s ? "bg-[#1D9E75]" : step === s ? "bg-foreground" : "bg-border"
                            }`}
                    />
                    {i < 2 && <div className="flex-1 h-px bg-border" />}
                </div>
            ))}
        </div>
    );
}

// ─── Cover Banner ────────────────────────────────────────────────────────────

const BADGE_LABELS: Record<number, string> = {
    1: "Reset your password",
    2: "Check your email",
    3: "Set new password",
    4: "All done!",
};

function CoverBanner({ step }: { step: number }) {

    return (
        <div className="relative w-full h-40 overflow-hidden rounded-t-lg bg-[#1a1a2e]">
            <div className="relative w-full h-44 overflow-hidden rounded-t-lg bg-[#1a1a2e]">
                <img
                    src="https://i.ytimg.com/vi/-1TPL1DiMaw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4YFk-qsP116YMrCzgXWP-o4iBuw"
                    alt="City Maid Rwanda TV Series"
                    className="w-full h-full object-cover object-top opacity-85"
                />

            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-5 py-3">
                <span className="inline-block text-[11px] text-white bg-white/20 border border-white/40 rounded px-2 py-0.5 mt-1 transition-all duration-300">
                    {BADGE_LABELS[step]}
                </span>
            </div>
        </div>
    );
}

// ─── Step 1: Email ────────────────────────────────────────────────────────────

function StepEmail({ onNext }: { onNext: (email: string) => void }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        // TODO: trigger password reset email
        setTimeout(() => { setLoading(false); onNext(email); }, 1200);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
                <h1 className="text-foreground text-lg font-medium mb-1">Forgot password?</h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    No worries. Enter your email and we'll send you a reset code.
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-muted-foreground text-sm">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
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
                disabled={loading}
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
                {loading ? <Spinner light /> : "Send reset code"}
            </button>

            <div className="text-center mt-1">
                <Link to="/Auth/signin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeftIcon />
                    Back to sign in
                </Link>
            </div>
        </form>
    );
}

// ─── Step 2: OTP ──────────────────────────────────────────────────────────────

function StepOTP({ email, onNext, onBack }: { email: string; onNext: () => void; onBack: () => void }) {
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const code = digits.join("");

    const handleChange = (idx: number, val: string) => {
        const digit = val.replace(/[^0-9]/g, "").slice(-1);
        const next = [...digits];
        next[idx] = digit;
        setDigits(next);
        if (digit && idx < 5) refs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[idx] && idx > 0) {
            refs.current[idx - 1]?.focus();
            const next = [...digits];
            next[idx - 1] = "";
            setDigits(next);
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6) return alert("Please enter the full 6-digit code.");
        setLoading(true);
        // TODO: verify OTP with backend
        setTimeout(() => { setLoading(false); onNext(); }, 1200);
    };

    const handleResend = (e: React.MouseEvent) => {
        e.preventDefault();
        setResent(true);
        setDigits(Array(6).fill(""));
        refs.current[0]?.focus();
        // TODO: resend code to email
        setTimeout(() => setResent(false), 3000);
    };

    useEffect(() => { refs.current[0]?.focus(); }, []);

    return (
        <form onSubmit={handleVerify} className="flex flex-col gap-3">
            <div>
                <h1 className="text-foreground text-lg font-medium mb-1">Check your email</h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                    We sent a 6-digit code to{" "}
                    <span className="text-foreground font-medium">{email}</span>
                </p>
                <p className="text-muted-foreground/70 text-xs mb-5">Enter the code below to continue.</p>
            </div>

            {/* OTP inputs */}
            <div className="flex gap-2 justify-center mb-1">
                {digits.map((d, i) => (
                    <input
                        key={i}
                        aria-label={`OTP digit ${i + 1} of 6`}
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        ref={(el) => { refs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="
              w-11 h-12 text-center text-xl font-medium rounded-md
              bg-input border border-border
              text-foreground
              focus:outline-none focus:ring-2 focus:ring-ring
              transition-shadow duration-150
            "
                    />
                ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
                {resent ? (
                    <span className="text-[#1D9E75]">Code resent!</span>
                ) : (
                    <>
                        Didn't receive it?{" "}
                        <a href="#" onClick={handleResend} className="text-primary hover:underline">
                            Resend code
                        </a>
                    </>
                )}
            </p>

            <button
                type="submit"
                disabled={loading || code.length < 6}
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
                {loading ? <Spinner light /> : "Verify code"}
            </button>

            <BackLink onClick={onBack} />
        </form>
    );
}

// ─── Step 3: New Password ─────────────────────────────────────────────────────

function StepNewPassword({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const strength = getStrength(password);
    const mismatch = confirm.length > 0 && password !== confirm;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) return alert("Passwords do not match.");
        setLoading(true);
        // TODO: submit new password to backend
        setTimeout(() => { setLoading(false); onNext(); }, 1400);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
                <h1 className="text-foreground text-lg font-medium mb-1">Set new password</h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    Choose a strong password for your account.
                </p>
            </div>

            {/* New password */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="new-pw" className="text-muted-foreground text-sm">New password</label>
                <div className="relative">
                    <input
                        id="new-pw"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="
              w-full h-10 pl-3 pr-10 rounded-md
              bg-input border border-border
              text-foreground text-sm
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring
              transition-shadow duration-150
            "
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <EyeIcon open={showPassword} />
                    </button>
                </div>

                {strength && (
                    <div className="mt-0.5">
                        <div className="h-[3px] w-full bg-border rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{ width: strength.width, background: strength.color }}
                            />
                        </div>
                        <span className="text-xs mt-0.5 block" style={{ color: strength.color }}>
                            {strength.label}
                        </span>
                    </div>
                )}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-pw" className="text-muted-foreground text-sm">Confirm new password</label>
                <div className="relative">
                    <input
                        id="confirm-pw"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className={`
              w-full h-10 pl-3 pr-10 rounded-md
              bg-input border text-foreground text-sm
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring
              transition-shadow duration-150
              ${mismatch ? "border-destructive" : "border-border"}
            `}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <EyeIcon open={showConfirm} />
                    </button>
                </div>
                {mismatch && (
                    <span className="text-xs text-destructive">Passwords do not match</span>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || mismatch}
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
                {loading ? <Spinner light /> : "Reset password"}
            </button>

            <BackLink onClick={onBack} />
        </form>
    );
}

// ─── Step 4: Success ──────────────────────────────────────────────────────────

function StepSuccess() {
    return (
        <div className="text-center py-2">
            <div className="w-13 h-13 rounded-full bg-[#E1F5EE] flex items-center justify-center mx-auto mb-4" style={{ width: 52, height: 52 }}>
                <CheckIcon />
            </div>
            <h1 className="text-foreground text-lg font-medium mb-1.5">Password reset!</h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Your password has been updated successfully. You can now sign in with your new password.
            </p>
            <Link
                to="/Auth/signin"
                className="
          inline-flex items-center justify-center
          w-full h-10 rounded-md
          bg-primary text-primary-foreground
          text-sm font-medium
          hover:opacity-90 active:scale-[0.98]
          transition-all duration-150
        "
            >
                Go to sign in
            </Link>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ForgotPasswordForm() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-sm bg-card border border-border rounded-lg overflow-hidden">

                <CoverBanner step={step} />

                <div className="p-7">
                    {step < 4 && <StepIndicator step={step} />}

                    {step === 1 && (
                        <StepEmail
                            onNext={(e) => { setEmail(e); setStep(2); }}
                        />
                    )}

                    {step === 2 && (
                        <StepOTP
                            email={email}
                            onNext={() => setStep(3)}
                            onBack={() => setStep(1)}
                        />
                    )}

                    {step === 3 && (
                        <StepNewPassword
                            onNext={() => setStep(4)}
                            onBack={() => setStep(2)}
                        />
                    )}

                    {step === 4 && <StepSuccess />}
                </div>
            </div>
        </div>
    );
}