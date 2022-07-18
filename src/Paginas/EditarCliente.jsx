import { useEffect, useState } from 'react'
import Formulario from "../components/Formulario"
import { useParams } from 'react-router-dom'

const EditarCliente = () => {
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
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>En este formulario editaras los datos del cliente</p>
            {cliente?.nombre ? (
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            ) : <p>El ID del cliente no es valido</p>}
        </>
    )
}
export default EditarCliente