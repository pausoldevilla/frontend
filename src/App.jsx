import React, { useState, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
