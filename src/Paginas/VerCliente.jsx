import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    //Estado de cargando 
    const [cargando, setCargando] = useState(true)
    const { id } = useParams()
    useEffect(() => {
        const verInfoCliente = async () => {

            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)

            } catch (error) {
                throw error
            }
            setCargando(!cargando)
        }
        verInfoCliente()
    }, [])

    return (
        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultado</p> : (

            <div>

                <>
                    <h1 className='font-black text-4xl text-blue-900'>Ver cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Informacion de los clientes</p>
                    <p className='text-4xl text-gray-600 mt-4 '>
                        <span className=' uppercase text-gray-800 font-bold '>Cliente: </span>
                        {cliente.nombre}
                    </p>
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className=' uppercase text-gray-800 font-bold '>Empresa: </span>
                        {cliente.empresa}
                    </p>
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className=' uppercase text-gray-800 font-bold '>Telefono: </span>
                        {cliente.telefono}
                    </p>
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className=' uppercase text-gray-800 font-bold '>E-mail: </span>
                        {cliente.email}
                    </p>
                    {cliente.notas && (

                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' uppercase text-gray-800 font-bold '>Notas: </span>
                            {cliente.notas}
                        </p>
                    )}
                </>

            </div>
        )
    )
}

export default VerCliente