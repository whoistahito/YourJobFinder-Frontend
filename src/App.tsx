import {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';
import {JobSearchForm} from './components/JobSearchForm';
import {Unsubscribe} from "./pages/Unsubscribe.tsx";
import {UnsubscribeError} from "./pages/UnsubscribeError.tsx";
import {UnsubscribeHandler} from "./pages/UnsubscribeHandler.tsx";
import {ContactUs} from "./components/ContactUs.tsx";
import {TermsOfUse} from "./components/TermsOfUse.tsx";
import {EmailConfirm} from "./pages/EmailConfirm.tsx";
import {EmailConfirmError} from "./pages/EmailConfirmError.tsx";
import {NotFound} from './pages/NotFound';
import Blog from './pages/Blog';
import Poster from './pages/Poster';
import DesignSystem from './pages/DesignSystem';
import WhyUsPreview from './pages/WhyUsPreview';
import HowItWorksLab from './pages/HowItWorksLab';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
    return (
        <Fragment>
            {/* Skip to content for keyboard users; every page renders <main id="main-content"> */}
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Routes>
                <Route path="/" element={<JobSearchForm/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/confirm-email/success" element={<EmailConfirm/>}/>
                <Route path="/confirm-email/error" element={<EmailConfirmError/>}/>
                <Route path="/unsubscribe/process" element={<UnsubscribeHandler/>}/>
                <Route path="/unsubscribe" element={<Unsubscribe/>}/>
                <Route path="/unsubscribe/error" element={<UnsubscribeError/>}/>
                <Route path="/terms" element={<TermsOfUse/>}/>
                <Route path="/imprint" element={<Imprint/>}/>
                <Route path="/impressum" element={<Imprint/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path="/datenschutz" element={<Privacy/>}/>
                <Route path="/contact" element={<ContactUs/>}/>
                <Route path="/poster" element={<Poster/>}/>
                <Route path="/design-system" element={<DesignSystem/>}/>
                <Route path="/why-us" element={<WhyUsPreview/>}/>
                <Route path="/lab/how-it-works" element={<HowItWorksLab/>}/>
                <Route path="/lab/how-it-works/:version" element={<HowItWorksLab/>}/>
                <Route path="/dashboard/:userId" element={<Dashboard/>}/>
                {/* Branded 404 — any unknown URL lands here */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Fragment>
    );
}

export default App;
