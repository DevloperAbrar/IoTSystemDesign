import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bell, DoorOpen, DoorClosed, Shirt, AlertCircle, Power, RefreshCw } from 'lucide-react';

const API_URL = `http://${import.meta.env.VITE_ESP32_IP}/api`;

const Controller = () => {
  const [status, setStatus] = useState({
    ledState: false,
    buzzerState: false,
    servoDoorAngle: 0,
    hangerState: false,
    servoHangerAngle: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setStatus(data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection error - check ESP32 IP');
    }
  };

  const toggleLED = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/led`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ state: !status.ledState }),
      });
      if (!response.ok) throw new Error('LED control failed');
      await fetchData();
    } catch (err) {
      console.error('LED error:', err);
      setError('LED control failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleBuzzer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/buzzer`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ state: !status.buzzerState }),
      });
      if (!response.ok) throw new Error('Buzzer control failed');
      await fetchData();
    } catch (err) {
      console.error('Buzzer error:', err);
      setError('Buzzer control failed');
    } finally {
      setLoading(false);
    }
  };

  const controlDoor = async (angle) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/servo`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ angle }),
      });
      if (!response.ok) throw new Error('Door control failed');
      setTimeout(fetchData, 500);
    } catch (err) {
      console.error('Door error:', err);
      setError('Door control failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleHanger = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/hanger`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ state: !status.hangerState }),
      });
      if (!response.ok) throw new Error('Hanger control failed');
      setTimeout(fetchData, 500);
    } catch (err) {
      console.error('Hanger error:', err);
      setError('Hanger control failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IoT Device Controller
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time control of connected devices
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
            <span className="font-semibold text-gray-800 dark:text-white">
              {error ? 'Disconnected' : 'Connected to ESP32'}
            </span>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Control Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LED Control */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl ${status.ledState ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-300`}>
                    <Lightbulb className={`w-8 h-8 ${status.ledState ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">LED Light</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Smart Lighting Control</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${status.ledState ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {status.ledState ? 'ON' : 'OFF'}
                </div>
              </div>
              <button
                onClick={toggleLED}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  status.ledState
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              >
                {loading ? 'Processing...' : status.ledState ? 'Turn OFF' : 'Turn ON'}
              </button>
            </div>
          </motion.div>

          {/* Buzzer Control */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl ${status.buzzerState ? 'bg-gradient-to-r from-blue-400 to-cyan-500 animate-pulse' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-300`}>
                    <Bell className={`w-8 h-8 ${status.buzzerState ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Buzzer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Alert System</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${status.buzzerState ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {status.buzzerState ? 'ON' : 'OFF'}
                </div>
              </div>
              <button
                onClick={toggleBuzzer}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  status.buzzerState
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              >
                {loading ? 'Processing...' : status.buzzerState ? 'Turn OFF' : 'Turn ON'}
              </button>
            </div>
          </motion.div>

          {/* Door Control */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300">
                    {status.servoDoorAngle === 90 ? (
                      <DoorOpen className="w-8 h-8 text-white" />
                    ) : (
                      <DoorClosed className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Door Control</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Servo Motor</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  {status.servoDoorAngle}°
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => controlDoor(90)}
                  disabled={loading || status.servoDoorAngle === 90}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Processing...' : 'Open Door (90°)'}
                </button>
                <button
                  onClick={() => controlDoor(0)}
                  disabled={loading || status.servoDoorAngle === 0}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Processing...' : 'Close Door (0°)'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Hanger Control */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl ${status.hangerState ? 'bg-gradient-to-r from-indigo-400 to-blue-500' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-300`}>
                    <Shirt className={`w-8 h-8 ${status.hangerState ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Hanger</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatic Hanger System</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${status.hangerState ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {status.hangerState ? '90°' : '0°'}
                </div>
              </div>
              <button
                onClick={toggleHanger}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  status.hangerState
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              >
                {loading ? 'Processing...' : status.hangerState ? 'Retract Hanger' : 'Extend Hanger'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Controller;