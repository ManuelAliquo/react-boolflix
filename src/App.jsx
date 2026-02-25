import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import { SearchProvider } from "./contexts/SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}
