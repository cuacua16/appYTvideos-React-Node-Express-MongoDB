import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideosList } from "./components/videos/VideosList";
import { VideoCreateForm } from "./components/videos/VideoCreateForm";
import { Navbar } from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { VideoEditForm } from "./components/videos/VideoEditForm";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<VideosList />} />
          <Route path="/newVideo" element={<VideoCreateForm />} />
          <Route path="/edit/:id" element={<VideoEditForm />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
        <ToastContainer></ToastContainer>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
