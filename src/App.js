import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import TimelinePage from "./pages/TimelinePage";
import HashtagPage from "./pages/HashtagPage";
import UserPage from "./pages/UserPage";
import { UserContext } from "./contexts/UserContext";


function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <Routes >
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/' element={<SigninPage />} />
          <Route path='/timeline' element={<TimelinePage />} />
          <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
