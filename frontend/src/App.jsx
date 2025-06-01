import { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Profile = lazy(() => import('./pages/Profile')); // Add Profile
const SingleAlbum = lazy(() => import('./components/Album/SingleAlbum'));
const AuthForm = lazy(() => import('./components/AuthForm/AuthForm'));


const DefaultLayout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <div className="flex-grow-1">{children}</div>
  </div>
);

const AlbumLayout = ({ children }) => ( 
  <div className="album-layout d-flex flex-column min-vh-100">
  <div className="flex-grow-1">{children}</div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
          
           <Route path="/auth" element={<DefaultLayout><AuthForm /></DefaultLayout>} />
            <Route
                path="/hr"
                element={
                  <ProtectedRoute>
                    <DefaultLayout><Profile /></DefaultLayout> {/* Use Profile */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/album/:id"
                element={
                  <ProtectedRoute>
                    <DefaultLayout><SingleAlbum /></DefaultLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/hr" />} />
              <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </HashRouter>
    </div>
  );
}

function NotFound() {
  console.error('Page not found!');
  return (
    <div className="text-center py-5">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;

{/** <Route path="/graphics" element={<Navigate to="/portfolio/graphics" replace />} /> */}



/**
 * hr/
├── .gitignore
├── package.json
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── src/
│   │   ├── config/connection.js
│   │   ├── models/Album.js
│   │   ├── routes/albumRoutes.js
│   │   ├── controllers/albumController.js
│   │   ├── utils/fileUpload.js
│   │   └── server.js
│   └── uploads/
├── frontend/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   └── (your album component and other frontend files)
│   └── dist/
 */