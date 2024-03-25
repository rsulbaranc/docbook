import { useEffect, useState } from 'react';
import '../../assets/css/spinner.css'

export const Spinner = ({spinenrText, isActive}) => {

    if(!isActive) return null;

    const [dots, setDots] = useState(0);

    useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4); // Ciclo entre 0, 1, 2 y 3
    }, 500); // Cambia el estado cada 500ms

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []);

  return (
    <div className='z-50 fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center flex-col gap-1'>
        <div className='spinner'></div>
        <span className='text-white text-xl'> {spinenrText ? spinenrText : 'Cargando'}{Array(dots).fill('.').join('')}</span>
    </div>
  )
}
