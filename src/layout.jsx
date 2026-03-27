import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Contacts />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/editContact/:id" element={<EditContact />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </>
    )
);