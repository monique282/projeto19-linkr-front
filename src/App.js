import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/UserContext.js";
import HashtagPage from "./pages/HashtagPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TimelinePage from "./pages/TimelinePage";
import UserPage from "./pages/UserPage";



function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes >
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/' element={<SigninPage />} />
          <Route path='/timeline' element={<TimelinePage />} />
          <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
