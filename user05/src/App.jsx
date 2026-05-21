import { Routes, Route, BrowserRouter } from 'react-router-dom';
import User from './function/User';
import Open from './pages/Open';
import ShowSlidePage from './pages/ShowSlidePage';
import PageTransitionLayout from './layout/PageTransitionLayout';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PageTransitionLayout />}>
        <Route path="/User/:docId" element={<User />} />
        <Route path="/Open/:docId" element={<Open />} />
        <Route path="/OpenendShow/:docId/:index" element={<ShowSlidePage expectedType="open" />} />
        <Route path="/RankingShow/:docId/:index" element={<ShowSlidePage expectedType="rank" />} />
        <Route path="/WordcloudShow/:docId/:index" element={<ShowSlidePage expectedType="word" />} />
        <Route path="/MultipleShow/:docId/:index" element={<ShowSlidePage expectedType="multiple" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
