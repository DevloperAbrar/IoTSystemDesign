// import { useState, useEffect } from "react";

// const API_URL = `http://${import.meta.env.VITE_ESP32_IP}/api`;

// function App() {
//   const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0 });
//   const [status, setStatus] = useState({
//     ledState: false,
//     buzzerState: false,
//     servoDoorAngle: 0,
//     hangerState: false,
//     servoHangerAngle: 0,
//     pumpState: false,
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${API_URL}/status`);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
//       setStatus(data);
//       setSensorData({
//         temperature: data.temperature,
//         humidity: data.humidity
//       });
//       setError("");
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Connection error - check ESP32 IP");
//     }
//   };

//   const toggleLED = async () => {
//     try {
//       const response = await fetch(`${API_URL}/led`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ state: !status.ledState })
//       });
//       if (!response.ok) throw new Error('LED control failed');
//       fetchData();
//     } catch (err) {
//       console.error("LED error:", err);
//       setError("LED control failed");
//     }
//   };

//   const toggleBuzzer = async () => {
//     try {
//       const response = await fetch(`${API_URL}/buzzer`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ state: !status.buzzerState })
//       });
//       if (!response.ok) throw new Error('Buzzer control failed');
//       fetchData();
//     } catch (err) {
//       console.error("Buzzer error:", err);
//       setError("Buzzer control failed");
//     }
//   };

//   const openDoor = async () => {
//     try {
//       const response = await fetch(`${API_URL}/servo`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ angle: 90 })
//       });
//       if (!response.ok) throw new Error('Door control failed');
//       setStatus((prev) => ({ ...prev, servoDoorAngle: 90 }));
//       setTimeout(fetchData, 500);
//     } catch (err) {
//       console.error("Door error:", err);
//       setError("Door control failed");
//     }
//   };

//   const closeDoor = async () => {
//     try {
//       const response = await fetch(`${API_URL}/servo`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ angle: 0 })
//       });
//       if (!response.ok) throw new Error('Door control failed');
//       setStatus((prev) => ({ ...prev, servoDoorAngle: 0 }));
//       setTimeout(fetchData, 500);
//     } catch (err) {
//       console.error("Door error:", err);
//       setError("Door control failed");
//     }
//   };

//   const toggleHanger = async () => {
//     try {
//       const response = await fetch(`${API_URL}/hanger`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ state: !status.hangerState })
//       });
//       if (!response.ok) throw new Error('Hanger control failed');
//       setTimeout(fetchData, 500);
//     } catch (err) {
//       console.error("Hanger error:", err);
//       setError("Hanger control failed");
//     }
//   };

//   const togglePump = async () => {
//     try {
//       const response = await fetch(`${API_URL}/pump`, {
//         method: 'POST',
//         headers: { "Content-Type": "text/plain" },
//         body: JSON.stringify({ state: !status.pumpState })
//       });
//       if (!response.ok) throw new Error('Pump control failed');
//       setTimeout(fetchData, 500);
//     } catch (err) {
//       console.error("Pump error:", err);
//       setError("Pump control failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//           ESP32 IoT Controller
//         </h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}

//         {/* Sensor Data */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//             Sensor Data
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-lg">
//               <p className="text-sm opacity-90">Temperature</p>
//               <p className="text-4xl font-bold">{sensorData.temperature}°C</p>
//             </div>
//             <div className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white p-6 rounded-lg">
//               <p className="text-sm opacity-90">Humidity</p>
//               <p className="text-4xl font-bold">{sensorData.humidity}%</p>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Controls</h2>

//           {/* LED Control */}
//           <div className="mb-6 flex items-center justify-between">
//             <span className="text-lg font-medium">💡 LED Light</span>
//             <button
//               onClick={toggleLED}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 status.ledState
//                   ? "bg-green-500 hover:bg-green-600 text-white"
//                   : "bg-gray-300 hover:bg-gray-400 text-gray-700"
//               }`}
//             >
//               {status.ledState ? "ON" : "OFF"}
//             </button>
//           </div>

//           {/* Buzzer Control */}
//           <div className="mb-6 flex items-center justify-between">
//             <span className="text-lg font-medium">🔔 Buzzer</span>
//             <button
//               onClick={toggleBuzzer}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 status.buzzerState
//                   ? "bg-yellow-500 hover:bg-yellow-600 text-white"
//                   : "bg-gray-300 hover:bg-gray-400 text-gray-700"
//               }`}
//             >
//               {status.buzzerState ? "ON" : "OFF"}
//             </button>
//           </div>

//           {/* Door Control */}
//           <div className="mb-6">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-lg font-medium">🚪 Door Control</span>
//               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                 {status.servoDoorAngle === 90 ? "Open" : status.servoDoorAngle === 0 ? "Closed" : `${status.servoDoorAngle}°`}
//               </span>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={openDoor}
//                 className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
//                   status.servoDoorAngle === 90
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200 hover:bg-green-400 hover:text-white text-gray-700"
//                 }`}
//               >
//                 Open (90°)
//               </button>
//               <button
//                 onClick={closeDoor}
//                 className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
//                   status.servoDoorAngle === 0
//                     ? "bg-red-500 text-white"
//                     : "bg-gray-200 hover:bg-red-400 hover:text-white text-gray-700"
//                 }`}
//               >
//                 Close (0°)
//               </button>
//             </div>
//           </div>

//           {/* Hanger Control */}
//           <div className="mb-6 flex items-center justify-between">
//             <span className="text-lg font-medium">👕 Hanger</span>
//             <button
//               onClick={toggleHanger}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 status.hangerState
//                   ? "bg-purple-500 hover:bg-purple-600 text-white"
//                   : "bg-gray-300 hover:bg-gray-400 text-gray-700"
//               }`}
//             >
//               {status.hangerState ? "ON (90°)" : "OFF (0°)"}
//             </button>
//           </div>

//           {/* Water Pump Control */}
//           <div className="mb-4 flex items-center justify-between">
//             <span className="text-lg font-medium">💧 Water Pump</span>
//             <button
//               onClick={togglePump}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 status.pumpState
//                   ? "bg-blue-500 hover:bg-blue-600 text-white"
//                   : "bg-gray-300 hover:bg-gray-400 text-gray-700"
//               }`}
//             >
//               {status.pumpState ? "ON" : "OFF"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Controller from './Components/Controller';
import Visualization from './Components/Visualization';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = sessionStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      body.classList.add('dark');
      sessionStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      body.classList.remove('dark');
      sessionStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-500" 
      style={{ 
        background: darkMode 
          ? 'linear-gradient(to bottom right, rgb(17, 24, 39), rgb(31, 41, 55))' 
          : 'linear-gradient(to bottom right, rgb(249, 250, 251), rgb(243, 244, 246))' 
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/controller" 
          element={
            <ProtectedRoute darkMode={darkMode}>
              <Controller />
            </ProtectedRoute>
          } 
        />
        <Route path="/visualization" element={<Visualization />} />
      </Routes>
    </div>
  );
}

export default App;