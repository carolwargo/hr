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
 * Project File Structure:
 * hr/
├── root/
│   ├── node_modules/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
├── backend/
│   ├── config/
│   │   ├── connection.js
│   ├── controllers/
│   │   ├── albumController.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── Album.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── albumRoutes.js
│   │   ├── authRoutes.js
│   ├── uploads/
│   ├── utils/
│   │   ├── fileUpload.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── seed.js
│   ├── server.js
├── frontend/
|   ├── dist/
│   ├── node_modules/
│   ├── public/
|   ├── src/
│   │   ├── api/
│   │   │   └── index.jsx
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── Album/
│   │   │   │   ├── AlbumComponent.jsx 
│   │   │   │   └── SingleAlbum.jsx
│   │   │   ├── AuthForm/
│   │   │   |   ├── AuthForm.css
│   │   │   |   |── AuthForm.jsx
│   │   │   ├── CustomSocialIcons/
│   │   │   |   ├── CustomSocialIcons.css
│   │   │   |   └── CustomSocialIcons.jsx
│   │   │   ├── ForgotPassword/
│   │   │   |   ├── ForgotPassword.css
│   │   │   |   └── ForgotPassword.jsx
│   │   ├── pages/
│   │   │   ├── AlbumPage.jsx
│   │   │   ├── Homepage.jsx
│   │   │   ├── Profile.jsx
│   |   ├── .env
│   |   ├── App.css
│   |   ├── App.jsx
│   │   ├── ErrorBoundary.jsx
│   |   ├── index.css
│   |   ├── main.jsx
│   |   ├── .gitignore
│   |   ├── eslint.config.js
│   |   ├── index.html
│   |   ├── package-lock.json
│   |   ├── package.json
│   |   ├── README.md
│   |   ├── vite.config.js
 */




/**LATEST FILE STRUCTURE 9:42AM 6/2 */

/*/hr/
├── .gitignore
├── package.json
├── package-lock.json
├── node_modules/
├── backend/
│   ├── .gitignore
│   ├── .env
│   ├── package.json
│   ├── node_modules/
│   ├── Uploads/
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── connection.js
│   │   ├── controllers/
│   │   │   └── albumController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Album.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── albumRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── utils/
│   │   │   └── fileUpload.js
│   ├── seed.js
├── frontend/
    ├── .gitignore
    ├── .env
    ├── package.json
    ├── package-lock.json
    ├── node_modules/
    ├── public/
    │   └── placeholder.jpg
    ├── src/
    │   ├── api/
    │   │   └── api.js
    │   ├── assets/
    │   │   └── images/
    │   │       └── White.png
    │   ├── components/
    │   │   ├── Album/
    │   │   │   ├── AlbumComponent.jsx
    │   │   │   └── SingleAlbum.jsx
    │   │   ├── AuthForm/
    │   │   │   ├── AuthForm.css
    │   │   │   └── AuthForm.jsx
    │   │   ├── CustomSocialIcons/
    │   │   │   ├── CustomSocialIcons.css
    │   │   │   └── CustomSocialIcons.jsx
    │   │   ├── ForgotPassword/
    │   │   │   ├── ForgotPassword.css
    │   │   │   └── ForgotPassword.jsx
    │   ├── pages/
    │   │   └── Profile.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── ErrorBoundary.jsx
    │   ├── index.css
    │   ├── main.jsx
    ├── dist/
    ├── eslint.config.js
    ├── index.html
    ├── vite.config.js
    */ 