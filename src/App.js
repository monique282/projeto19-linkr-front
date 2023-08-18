import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import TimelinePage from "./pages/TimelinePage";
import HashtagPage from "./pages/HashtagPage";
import UserPage from "./pages/UserPage";
import AuthProvider from "./contexts/UserContext.js";



function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes >
          <Route path='/singup' element={<SignupPage />} />
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
