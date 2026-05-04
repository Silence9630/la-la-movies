import { BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy, Suspense } from 'react';

const LoginPage  =lazy(() => import('../features/Auth/login'))
const SignupPage =lazy(() => import('../features/Auth/signup'))
const ForgotPassword =lazy(() => import('../features/Auth/forgotPassword'))

export default function Router() {
    return (
        <BrowserRouter>
           <Suspense fallback={null}>
              <Routes>
                <Route path="/Auth/signin" element={<LoginPage />} />
                <Route path="/Auth/signup" element={<SignupPage />} />
                <Route path="/Auth/forgot-password" element={<ForgotPassword />} />
              </Routes>
           </Suspense>
        </BrowserRouter>
    )
}