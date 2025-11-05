import React, { useEffect, useState } from 'react'
import './index.css';


function App() {

  type carta = {
    id: number;
    imagen: string;
    pareja: boolean;
    revela: boolean;
  }

  const [cards, setCards]=useState<carta[]>([]);
  const [carta1,setCarta1]=useState<carta | null>(null);
  const [carta2,setCarta2]=useState< carta | null>(null);



  const generarCartas = (): void => {
      const elementos = ["🍎", "🍌", "🍓", "🍇", "🍒", "🍉", "🍎", "🍌", "🍓", "🍇", "🍒", "🍉"];

      const elementosBarajadas =elementos.sort(()=> Math.random()-0.5);

      const cartas = elementosBarajadas.map((img)=>({
      id:Math.random(),
      imagen:img,
      pareja: false,
      revela:false
      }));

      setCards(cartas);
  };

  useEffect(()=>{
    generarCartas();
  },[])


  const handleRevela=(id:number)=>{
    if(carta1&&carta2) return;
    const cartaSeleccionada= cards.find((c) => c.id===id);
    if (!cartaSeleccionada || cartaSeleccionada.revela || cartaSeleccionada.pareja) return;
    setCards((prev)=>prev.map((carta)=> carta.id===id ?{...carta, revela: true} :carta))
    

    if(!carta1) {setCarta1(cartaSeleccionada) }
    else if (!carta2 && carta1) {setCarta2(cartaSeleccionada)}
  }

  useEffect(()=>{
    if (!carta1 || !carta2) return;
    if(carta1.imagen === carta2.imagen){
      setCards(prev=> prev.map(c => c.imagen ===carta1.imagen ? {...c, pareja:true} : c));
    setCarta1(null);
    setCarta2(null);
    }
    else{
      const t = setTimeout(() => {
      setCards(prev =>
        prev.map(c =>
          (c.id === carta1.id || c.id === carta2.id)
            ? { ...c, revela: false }
            : c
        )
      );
      setCarta1(null);
      setCarta2(null);
    }, 1000);

    return () => clearTimeout(t);
    }
  },[carta1, carta2]);

  useEffect(() => {
  if (cards.length && cards.every(c => c.pareja)) {
    alert("🎉 ¡Ganaste!");
  }
  }, [cards]);

    const reiniciar=():void=>{
    setCarta1(null);
    setCarta2(null);
    generarCartas();
  }


return(
  <div>
    <h1 className='text-center text-4xl m-4 font-bold'>JUEGO DE MEMORIA</h1>
    <div className='grid grid-cols-4 m-6'>
    {cards.map((e)=>(
        <div className='border-6 text-4xl flex items-center justify-center p-4 cursor-pointer rounded-lg m-2 text-6xl text-shadow-md' key={e.id } onClick={()=>handleRevela(e.id)}>
          <h1>{e.revela ? e.imagen: "❓"}</h1>
        </div>  
    ))}
    </div>
    <button className='border-4 m-6 text-center text-3xl rounded-lg ' onClick={reiniciar}>Reiniciar </button>
  </div>
)

}
export default App
