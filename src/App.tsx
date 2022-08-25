import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "./Home";
import DataId from "./DataId";

interface getDataType {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<DataId />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
