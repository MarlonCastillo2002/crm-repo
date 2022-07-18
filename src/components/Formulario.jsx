import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Error from './Error'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es demasiado corto').max(20, 'El nombre es demasiado largo').required('El nombre es necesario'),
        empresa: Yup.string().required('El Nombre de la empresa es obligatorio'),
        email: Yup.string().email('Email no valido').required('El email es obligatorio'),
        telefono: Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('El numero no es valido'),

    })
    const handleSubmit = async (valores) => {
        //Funcion para agregar los datos a nuestro fake back end
        let respuesta
        try {
            if (cliente.id) {
                //Editando Cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //Agregando Nuevo cliente
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()

            //Para redireccionar a otra pagina usamos el hook de react-router-dom, useNavigate()
            navigate('/clientes')
        } catch (error) {
            console.log(error);

        }
    }
    return (
        cargando ? <Spinner /> : (


            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md  md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

                <Formik initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm()
                    }}

                    validationSchema={validationSchema}
                >

                    {({ errors, touched }) => {

                        return (
                            <Form className='mt-10 '>
                                <div className='mb-4'>
                                    <label htmlFor="nombre" className='text-gray-800'>Nombre</label>
                                    <Field
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        id='nombre'
                                        placeholder='Nombre del cliente'
                                        name='nombre'
                                    />
                                </div>
                                {errors.nombre && touched.nombre ? (
                                    <Error>{errors.nombre}</Error>
                                ) : null}

                                <div className='mb-4'>
                                    <label htmlFor="empresa" className='text-gray-800'>Empresa</label>
                                    <Field
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        id='empresa'
                                        placeholder='Empresa del cliente'
                                        name='empresa'
                                    />
                                </div>
                                {errors.empresa && touched.empresa ? (
                                    <Error>{errors.empresa}</Error>
                                ) : null}
                                <div className='mb-4'>
                                    <label htmlFor="email" className='text-gray-800'>Email</label>
                                    <Field
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        id='email'
                                        placeholder='Email del cliente'
                                        name='email'
                                    />
                                </div>
                                {errors.email && touched.email ? (
                                    <Error>{errors.email}</Error>
                                ) : null}
                                <div className='mb-4'>
                                    <label htmlFor="telefono" className='text-gray-800'>Telefono</label>
                                    <Field
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        id='telefono'
                                        placeholder='Telefono del cliente'
                                        name='telefono'
                                    />
                                </div>
                                {errors.telefono && touched.telefono ? (
                                    <Error>{errors.telefono}</Error>
                                ) : null}
                                <div className='mb-4'>
                                    <label htmlFor="notas" className='text-gray-800'>Notas</label>
                                    <Field
                                        as='textarea'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                        id='notas'
                                        placeholder='Notas del Cliente'
                                        name='notas'
                                    />
                                </div>
                                <input type="submit" value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />
                            </Form>)
                    }}
                </Formik>
            </div>
        )
    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
export default Formulario