import {Route, Routes} from 'react-router-dom';
import {JobSearchForm} from './components/JobSearchForm';
import {Unsubscribe} from "./pages/Unsubscribe.tsx";
import {UnsubscribeError} from "./pages/UnsubscribeError.tsx";
import {UnsubscribeHandler} from "./pages/UnsubscribeHandler.tsx";
import {ContactUs} from "./components/ContactUs.tsx";
import {TermsOfUse} from "./components/TermsOfUse.tsx";
import {EmailConfirm} from "./pages/EmailConfirm.tsx";
import {EmailConfirmError} from "./pages/EmailConfirmError.tsx";
import Blog from './pages/Blog';
import Poster from './pages/Poster';
import DesignSystem from './pages/DesignSystem';

function App() {
    return (
        <Routes>
            <Route path="/" element={<JobSearchForm/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/confirm-email/success" element={<EmailConfirm/>}/>
            <Route path="/confirm-email/error" element={<EmailConfirmError/>}/>
            <Route path="/unsubscribe/process" element={<UnsubscribeHandler/>}/>
            <Route path="/unsubscribe" element={<Unsubscribe/>}/>
            <Route path="/unsubscribe/error" element={<UnsubscribeError/>}/>
            <Route path="/terms" element={<TermsOfUse/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
            <Route path="/poster" element={<Poster/>}/>
            <Route path="/design-system" element={<DesignSystem/>}/>
        </Routes>
    );
}

export default App;