import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/app/home'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
)
