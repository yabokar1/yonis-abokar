import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CaseStudyPage from "./pages/CaseStudyPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="work/:slug" element={<CaseStudyPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
