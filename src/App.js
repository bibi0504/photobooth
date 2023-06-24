import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import Generate from './pages/generate';
import ShareSelfie from './pages/share';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share" element={<ShareSelfie />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
