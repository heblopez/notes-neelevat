import { useState } from 'react'

interface INota {
  id: number
  body: string
}

function App() {
  const notas = JSON.parse(localStorage.getItem("notas") || "[]")
  const newNoteIndex = notas.length + 1
  const [form, setForm] = useState({id: newNoteIndex, body: ""})

  const handleClick = () => {
    if (form.body.trim() === "") return
    notas.push(form)
    localStorage.setItem("notas", JSON.stringify(notas))
    setForm({id: newNoteIndex+1 , body: ""})
  }

  return (
    <div className='bg-sky-100 p-8 rounded-md h-screen overflow-y-scroll'>
      <h1 className='text-5xl font-extrabold m-8 bg-gradient-to-r from-purple-400 via-sky-500 to-cyan-700 bg-clip-text text-transparent'>
        Noteable
      </h1>
      <div className="container">
        <textarea name="form" cols={48} rows={3} value={form.body}
          placeholder="Escribe tu nota aquí..."
          className="p-4 text-lg" 
          onChange={(e) => setForm({...form, body: e.target.value})}>
        </textarea>
      </div>
      <div className="p-4 font-bold mb-3">
        <button className='bg-sky-400 hover:bg-cyan-600 text-white font-bold py-2 px-8 rounded-lg transition-colors text-xl' onClick={handleClick}>
          Crear
        </button>
      </div>
      <div className="flex flex-col gap-4 max-w-lg justify-center">
        {notas.map((nota: INota) => (
          <div key={nota.id} className='flex gap-2 p-2 bg-white items-center min-h-14 rounded-lg'>
            <div key={nota.id} className=" w-11/12 text-xl p-4 text-pretty" >
            {nota.body}
            </div>
            <button className='w-12 rounded-full h-12 hover:bg-slate-100'>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
