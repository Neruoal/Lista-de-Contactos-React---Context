import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { ContactForm } from "./pages/ContactForm";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout />}
        errorElement={<div className="route-feedback">Ruta no encontrada.</div>}
      >
        <Route index element={<Home />} />
        <Route path="contacts/new" element={<ContactForm />} />
        <Route path="contacts/:contactId/edit" element={<ContactForm />} />
      </Route>
    )
);