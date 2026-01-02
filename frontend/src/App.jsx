import { useState, useEffect } from 'react'

function App() {
  const [sensores, setSensores] = useState([])

  // Función para obtener datos de tu API Python
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard/live')
      const data = await response.json()
      setSensores(data)
    } catch (error) {
      console.error("Error conectando con COPOLT API:", error)
    }
  }

  // Actualizar datos cada 5 segundos automáticamente
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">COPOLT SmartFarm</h1>
          <p className="text-gray-600">Panel de Control Avícola y Porcino</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          + Nuevo Lote
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensores.map((sensor, index) => (
          <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${sensor.estado === 'ALERTA' ? 'border-red-500' : 'border-green-500'}`}>
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-700">{sensor.sector}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded ${sensor.estado === 'ALERTA' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {sensor.estado}
              </span>
            </div>
            
            <div className="flex justify-around text-center">
              <div>
                <p className="text-gray-400 text-sm">Temperatura</p>
                <p className="text-2xl font-bold">{sensor.temperatura}°C</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Humedad</p>
                <p className="text-2xl font-bold">{sensor.humedad}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
            
