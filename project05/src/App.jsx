import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Work from './pages/Work';
import Open from './pages/Open';
import Main from './pages/Main';
import Show from './pages/Show';
import LogIn from './login/LogIn';
import SignUp from './login/SignUp';
import Logout from './login/Logout';
import RequireAuth from './login/RequireAuth';
import { AuthProvider } from './login/Auth';
import PageTransitionLayout from './layout/PageTransitionLayout';
import NotFound from './pages/NotFound';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PageTransitionLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/work"
            element={
              <RequireAuth>
                <Work />
              </RequireAuth>
            }
          />
          <Route
            path="/Open/:docId"
            element={
              <RequireAuth>
                <Open />
              </RequireAuth>
            }
          />
          <Route
            path="/Show/:docId"
            element={
              <RequireAuth>
                <Show />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
