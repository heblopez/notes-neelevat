import { useState } from 'react'

interface INota {
  id: number
  body: string
}

function App() {
  const initialNotas = JSON.parse(localStorage.getItem("notas") || "[]")
  const newNoteIndex =  initialNotas.length === 0 ? 1 : initialNotas[initialNotas.length-1].id + 1
  const [form, setForm] = useState({id: newNoteIndex, body: ""})
  let [notas, setNotas] = useState<INota[]>(initialNotas)

  const handleClick = () => {
    if (form.body.trim() === "") return
    notas.push(form)
    localStorage.setItem("notas", JSON.stringify(notas))
    setForm({id: newNoteIndex+1 , body: ""})
  }

  const handleDelete = (id: number) => {
    notas = notas.filter((nota: INota) => nota.id !== id)
    setNotas(notas)
    localStorage.setItem("notas", JSON.stringify(notas))
  }

  return (
    <div className='container flex flex-col items-center w-full bg-sky-100 p-8 rounded-md h-max min-h-screen'>
      <h1 className='text-5xl font-extrabold m-8 bg-gradient-to-r from-purple-400 via-sky-500 to-cyan-700 bg-clip-text text-transparent'>
        Noteable
      </h1>
      <div>
        <textarea name="form" rows={3} value={form.body}
          placeholder="Escribe tu nota aquí..."
          className="p-4 text-lg min-w-96" 
          onChange={(e) => setForm({...form, body: e.target.value})}>
        </textarea>
      </div>
      <div className="p-4 font-bold mb-3">
        <button className='bg-sky-400 hover:bg-cyan-600 text-white font-bold py-2 px-8 rounded-lg transition-colors text-xl'
          onClick={handleClick}>
          Crear
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center w-full max-w-sm">
        {notas.map((nota: INota) => (
          <div key={nota.id} className='flex gap-2 p-2 bg-white items-center min-h-14 rounded-lg w-full'>
            <div className=" w-11/12 text-xl p-4 text-pretty" >
            {nota.body}
            </div>
            <button 
            className='w-12 rounded-full h-12 hover:bg-slate-100'
            onClick={() => handleDelete(nota.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
