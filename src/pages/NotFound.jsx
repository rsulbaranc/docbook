import { Link } from 'react-router-dom'
import { Card } from '../components/ui'

const NotFound = () => {
  return (
    <div className='h-[calc(100vh-64px)] flex justify-center items-center flex-col'>

        <Card>
          <div className='text-center'>
          <h1 className='text-2xl font-bold my-2'>Esta pagina no existe o no tienes los</h1>
          <h1 className='text-2xl font-bold my-2'>permisos suficientes para acceder a ella</h1>
          <h3 className='text-4xl'>404</h3>

          <Link to="/">Go Back Home</Link>
          </div>
        

        
        
        </Card>
    </div>
  )
}

export default NotFound