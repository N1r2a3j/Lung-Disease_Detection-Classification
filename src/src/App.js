// import logo from './logo.svg';
// import './App.css';
// import ParticipantTimeline from "./ParticipantTimeline";



// const participants = [
//   {
//     name: "Arjun Kava",
//     id: "ABC001",
//     date: "11 July 2024, 11:59",
//     duration: 20,
//     timeline: [
//       { time: "12:00", icon: "fas fa-microphone", active: true, offset: 5 },
//       { time: "12:03", icon: "fas fa-video", active: true, offset: 25 },
//       { time: "12:06", icon: "fas fa-share", active: false, offset: 50 },
//     ],
//   },
//   {
//     name: "Nikhil Chavda",
//     id: "ABC002",
//     date: "11 July 2024, 11:59",
//     duration: 20,
//     timeline: [
//       { time: "12:01", icon: "fas fa-microphone-slash", active: false, offset: 10 },
//       { time: "12:05", icon: "fas fa-video", active: true, offset: 35 },
//     ],
//   },
//   {
//     name: "Ahmed Bhesaniya",
//     id: "ABC003",
//     date: "11 July 2024, 11:59",
//     duration: 20,
//     timeline: [
//       { time: "12:02", icon: "fas fa-microphone", active: true, offset: 15 },
//       { time: "12:07", icon: "fas fa-video-slash", active: false, offset: 55 },
//     ],
//   },
//   {
//     name: "Arjun Kava",
//     id: "ABC001",
//     date: "11 July 2024, 11:59",
//     duration: 20,
//     timeline: [
//       { time: "12:00", icon: "fas fa-microphone", active: true, offset: 5 },
//       { time: "12:03", icon: "fas fa-video", active: true, offset: 25 },
//       { time: "12:06", icon: "fas fa-share", active: false, offset: 50 },
//     ],
//   },
//   {
//     name: "Arjun Kava",
//     id: "ABC001",
//     date: "11 July 2024, 11:59",
//     duration: 20,
//     timeline: [
//       { time: "12:00", icon: "fas fa-microphone", active: true, offset: 5 },
//       { time: "12:03", icon: "fas fa-video", active: true, offset: 25 },
//       { time: "12:06", icon: "fas fa-share", active: false, offset: 50 },
//     ],
//   },
// ];


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <ParticipantTimeline participants={participants} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import TimelineWithIcons from "./Components/TimelineWithIcons";
import { useState,useEffect } from "react";
import ImageClassifier from "./Component/PageFinal"

// import MainEl from "./Components/MainEl"
// export default TimelineWithIcons;


const App = () => {
  console.log("gooooooooooooooooo")

  
  
  return (
    <Router>
    <Routes>

      <Route path="/xray-classification" element={<ImageClassifier />} />
    </Routes>
    </Router>
  );
};

export default App;
