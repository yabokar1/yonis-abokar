import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import AgentPage from "./pages/AgentPage"
import CaseStudyPage from "./pages/CaseStudyPage"
import ExperiencePage from "./pages/ExperiencePage"
import GraphPage from "./pages/GraphPage"
import HomePage from "./pages/HomePage"
import MeshPage from "./pages/MeshPage"
import NotFoundPage from "./pages/NotFoundPage"
import PipelinePage from "./pages/PipelinePage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="agent" element={<AgentPage />} />
        <Route path="graphql" element={<GraphPage />} />
        <Route path="mesh" element={<MeshPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="work/:slug" element={<CaseStudyPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
