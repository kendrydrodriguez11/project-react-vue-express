import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ENDPOINT_API = 'http://localhost:3000/api/new';

function GestionPersonas() {
  const [datosFormulario, establecerDatosFormulario] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    genero: '',
    ciudad: ''
  });

  const [listaPersonas, establecerListaPersonas] = useState([]);
  const [idEditando, establecerIdEditando] = useState(null);
  const [erroresValidacion, establecerErroresValidacion] = useState({});
  const [cargando, establecerCargando] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    obtenerPersonas();
  }, []);

  const obtenerPersonas = async () => {
    try {
      establecerCargando(true);
      const respuesta = await axios.get(ENDPOINT_API);
      establecerListaPersonas(respuesta.data);
    } catch (error) {
      mostrarMensaje('Error al obtener los registros: ' + (error.message || 'Error desconocido'));
    } finally {
      establecerCargando(false);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosFormulario.dni || datosFormulario.dni.length < 8) {
      nuevosErrores.dni = 'El DNI debe contener mínimo 8 caracteres';
    }

    if (!datosFormulario.nombres.trim()) {
      nuevosErrores.nombres = 'El campo nombres es obligatorio';
    }

    if (!datosFormulario.apellidos.trim()) {
      nuevosErrores.apellidos = 'El campo apellidos es obligatorio';
    }

    if (!datosFormulario.fecha_nacimiento) {
      nuevosErrores.fecha_nacimiento = 'Debe seleccionar una fecha de nacimiento';
    }

    if (!datosFormulario.genero) {
      nuevosErrores.genero = 'Seleccione su género';
    }

    if (!datosFormulario.ciudad) {
      nuevosErrores.ciudad = 'Seleccione una ciudad de residencia';
    }

    establecerErroresValidacion(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      if (idEditando) {
        await axios.put(`${ENDPOINT_API}/${idEditando}`, datosFormulario);
        mostrarMensaje('Registro actualizado satisfactoriamente');
      } else {
        await axios.post(ENDPOINT_API, datosFormulario);
        mostrarMensaje('Nueva persona registrada exitosamente');
      }

      reiniciarFormulario();
      obtenerPersonas();
    } catch (error) {
      mostrarMensaje('Ocurrió un error: ' + (error.response?.data?.error || 'Error inesperado'));
    }
  };

  const manejarEdicion = (persona) => {
    establecerDatosFormulario(persona);
    establecerIdEditando(persona.id);
  };

  const manejarEliminacion = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar este registro?')) {
      try {
        await axios.delete(`${ENDPOINT_API}/${id}`);
        mostrarMensaje('Registro eliminado correctamente');
        obtenerPersonas();
      } catch (error) {
        mostrarMensaje('No se pudo eliminar el registro');
      }
    }
  };

  const reiniciarFormulario = () => {
    establecerDatosFormulario({
      dni: '',
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      genero: '',
      ciudad: ''
    });
    establecerIdEditando(null);
    establecerErroresValidacion({});
  };

  const mostrarMensaje = (mensaje) => {
    alert(mensaje);
  };

  const manejarCambioInput = (campo, valor) => {
    establecerDatosFormulario(previo => ({
      ...previo,
      [campo]: valor
    }));
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Sistema de Gestión de Pacientes</h1>
        
        <form onSubmit={manejarEnvio} className="form">
          <div className="form-group">
            <label htmlFor="dni">Número de Cédula:</label>
            <input
              id="dni"
              type="text"
              value={datosFormulario.dni}
              onChange={(e) => manejarCambioInput('dni', e.target.value)}
              placeholder="Ingrese el DNI"
            />
            {erroresValidacion.dni && <span className="error">{erroresValidacion.dni}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nombres">Nombres:</label>
            <input
              id="nombres"
              type="text"
              value={datosFormulario.nombres}
              onChange={(e) => manejarCambioInput('nombres', e.target.value)}
              placeholder="Ingrese los nombres"
            />
            {erroresValidacion.nombres && <span className="error">{erroresValidacion.nombres}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              id="apellidos"
              type="text"
              value={datosFormulario.apellidos}
              onChange={(e) => manejarCambioInput('apellidos', e.target.value)}
              placeholder="Ingrese los apellidos"
            />
            {erroresValidacion.apellidos && <span className="error">{erroresValidacion.apellidos}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
            <input
              id="fecha_nacimiento"
              type="date"
              value={datosFormulario.fecha_nacimiento}
              onChange={(e) => manejarCambioInput('fecha_nacimiento', e.target.value)}
            />
            {erroresValidacion.fecha_nacimiento && <span className="error">{erroresValidacion.fecha_nacimiento}</span>}
          </div>

          <div className="form-group">
            <label>Género:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={datosFormulario.genero === 'Masculino'}
                  onChange={(e) => manejarCambioInput('genero', e.target.value)}
                />
                <span>Masculino</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={datosFormulario.genero === 'Femenino'}
                  onChange={(e) => manejarCambioInput('genero', e.target.value)}
                />
                <span>Femenino</span>
              </label>
            </div>
            {erroresValidacion.genero && <span className="error">{erroresValidacion.genero}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ciudad">Ciudad de Residencia:</label>
            <select
              id="ciudad"
              value={datosFormulario.ciudad}
              onChange={(e) => manejarCambioInput('ciudad', e.target.value)}
            >
              <option value="">Elija una ciudad</option>
              <option value="Guayaquil">Guayaquil</option>
              <option value="Milagro">Milagro</option>
              <option value="Naranjito">Naranjito</option>
              <option value="Quito">Quito</option>
            </select>
            {erroresValidacion.ciudad && <span className="error">{erroresValidacion.ciudad}</span>}
          </div>

          <div className="button-group">
            <button type="submit" className="btn-submit">
              {idEditando ? 'Actualizar Paciente' : 'Agregar Paciente'}
            </button>
            {idEditando && (
              <button type="button" onClick={reiniciarFormulario} className="btn-cancel">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h2>Registros Existentes</h2>
        {cargando ? (
          <div className="loading">Cargando información...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Nacimiento</th>
                  <th>Género</th>
                  <th>Ciudad</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {listaPersonas.map((persona) => (
                  <tr key={persona.id}>
                    <td>{persona.dni}</td>
                    <td>{persona.nombres}</td>
                    <td>{persona.apellidos}</td>
                    <td>{formatearFecha(persona.fecha_nacimiento)}</td>
                    <td>{persona.genero}</td>
                    <td>{persona.ciudad}</td>
                    <td>
                      <button 
                        onClick={() => manejarEdicion(persona)} 
                        className="btn-edit"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => manejarEliminacion(persona.id)} 
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="image-section">
        <div className="image-content">
          <div className="medical-icon">🏥</div>
          <h2>Bienvenido al Sistema de Gestión</h2>
          <p>Mantenga sus registros de pacientes organizados y accesibles con nuestra plataforma especializada para clínicas y centros de salud.</p>
        </div>
      </div>
    </div>
  );
}

export default GestionPersonas;