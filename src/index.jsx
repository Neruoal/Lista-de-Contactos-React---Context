import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./layout";
import { StoreProvider } from "./hooks/useGlobalReducer";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    </React.StrictMode>
);
