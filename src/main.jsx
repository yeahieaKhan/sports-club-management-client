// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { RouterProvider } from "react-router";
// import { router } from "./routers/router.jsx";
// import AuthProvider from "./contextApi/AuthProvider.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <QueryClientProvider client={QueryClient}>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </QueryClientProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routers/router.jsx";
import AuthProvider from "./contextApi/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Pass the instance here */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
