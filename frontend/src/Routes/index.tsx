import { BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy, Suspense } from 'react';
const HomePage = lazy(() => import('../features/Home/Home'))

const LoginPage  =lazy(() => import('../features/Auth/login'))

export default function Router() {
    return (
        <BrowserRouter>
           <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Auth/login" element={<LoginPage />} />
              </Routes>
           </Suspense>
        </BrowserRouter>
    )
}