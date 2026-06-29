import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import CRM from './pages/CRM';
import Automations from './pages/Automations';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Publishing from './pages/Publishing';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        
        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/knowledgebase" element={<KnowledgeBase />} />
          <Route path="/publishing" element={<Publishing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Navigate to="/" replace />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
