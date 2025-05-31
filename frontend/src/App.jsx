//hr/frontend/src/App.jsx
import { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const Homepage = lazy(() => import('./pages/Homepage'));

const DefaultLayout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
  <div className="flex-grow-1">
      {children}
    </div>
  </div>
);





function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
          <Route path="/home" element={<DefaultLayout><Homepage /></DefaultLayout>} />
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
  return <div />;
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