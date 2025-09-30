<template>
  <div class="container">
    <div class="form-section">
      <h1>Sistema de Gestión de Pacientes</h1>

      <form @submit.prevent="manejarEnvio" class="form">
        <div class="form-group">
          <label for="dni">Número de Cédula:</label>
          <input
            id="dni"
            type="text"
            v-model="datosFormulario.dni"
            placeholder="Ingrese el DNI"
          />
          <span v-if="erroresValidacion.dni" class="error">{{ erroresValidacion.dni }}</span>
        </div>

        <div class="form-group">
          <label for="nombres">Nombres:</label>
          <input
            id="nombres"
            type="text"
            v-model="datosFormulario.nombres"
            placeholder="Ingrese los nombres"
          />
          <span v-if="erroresValidacion.nombres" class="error">{{ erroresValidacion.nombres }}</span>
        </div>

        <div class="form-group">
          <label for="apellidos">Apellidos:</label>
          <input
            id="apellidos"
            type="text"
            v-model="datosFormulario.apellidos"
            placeholder="Ingrese los apellidos"
          />
          <span v-if="erroresValidacion.apellidos" class="error">{{ erroresValidacion.apellidos }}</span>
        </div>

        <div class="form-group">
          <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            id="fecha_nacimiento"
            type="date"
            v-model="datosFormulario.fecha_nacimiento"
          />
          <span v-if="erroresValidacion.fecha_nacimiento" class="error">{{ erroresValidacion.fecha_nacimiento }}</span>
        </div>

        <div class="form-group">
          <label>Género:</label>
          <div class="radio-group">
            <label>
              <input type="radio" value="Masculino" v-model="datosFormulario.genero" />
              Masculino
            </label>
            <label>
              <input type="radio" value="Femenino" v-model="datosFormulario.genero" />
              Femenino
            </label>
          </div>
          <span v-if="erroresValidacion.genero" class="error">{{ erroresValidacion.genero }}</span>
        </div>

        <div class="form-group">
          <label for="ciudad">Ciudad de Residencia:</label>
          <select id="ciudad" v-model="datosFormulario.ciudad">
            <option value="">Elija una ciudad</option>
            <option value="Guayaquil">Guayaquil</option>
            <option value="Milagro">Milagro</option>
            <option value="Naranjito">Naranjito</option>
            <option value="Quito">Quito</option>
          </select>
          <span v-if="erroresValidacion.ciudad" class="error">{{ erroresValidacion.ciudad }}</span>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-submit">
            {{ idEditando ? 'Actualizar Paciente' : 'Agregar Paciente' }}
          </button>
          <button v-if="idEditando" type="button" @click="reiniciarFormulario" class="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>

      <h2>Registros Existentes</h2>
      <div v-if="cargando">Cargando información...</div>
      <div v-else class="table-container">
        <table class="table">
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
            <tr v-for="persona in listaPersonas" :key="persona.id">
              <td>{{ persona.dni }}</td>
              <td>{{ persona.nombres }}</td>
              <td>{{ persona.apellidos }}</td>
              <td>{{ formatearFecha(persona.fecha_nacimiento) }}</td>
              <td>{{ persona.genero }}</td>
              <td>{{ persona.ciudad }}</td>
              <td>
                <button @click="manejarEdicion(persona)" class="btn-edit">Editar</button>
                <button @click="manejarEliminacion(persona.id)" class="btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const ENDPOINT_API = 'http://localhost:3000/api/new';

export default {
  name: 'GestionPersonas',
  setup() {
    const datosFormulario = ref({
      dni: '',
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      genero: '',
      ciudad: ''
    });

    const listaPersonas = ref([]);
    const idEditando = ref(null);
    const erroresValidacion = ref({});
    const cargando = ref(false);

    const obtenerPersonas = async () => {
      try {
        cargando.value = true;
        const respuesta = await axios.get(ENDPOINT_API);
        listaPersonas.value = respuesta.data;
      } catch (error) {
        alert('Error al obtener los registros: ' + (error.message || 'Error desconocido'));
      } finally {
        cargando.value = false;
      }
    };

    const validarFormulario = () => {
      const nuevosErrores = {};
      if (!datosFormulario.value.dni || datosFormulario.value.dni.length < 8) nuevosErrores.dni = 'El DNI debe contener mínimo 8 caracteres';
      if (!datosFormulario.value.nombres.trim()) nuevosErrores.nombres = 'El campo nombres es obligatorio';
      if (!datosFormulario.value.apellidos.trim()) nuevosErrores.apellidos = 'El campo apellidos es obligatorio';
      if (!datosFormulario.value.fecha_nacimiento) nuevosErrores.fecha_nacimiento = 'Debe seleccionar una fecha de nacimiento';
      if (!datosFormulario.value.genero) nuevosErrores.genero = 'Seleccione su género';
      if (!datosFormulario.value.ciudad) nuevosErrores.ciudad = 'Seleccione una ciudad de residencia';
      erroresValidacion.value = nuevosErrores;
      return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async () => {
      if (!validarFormulario()) return;
      try {
        if (idEditando.value) {
          await axios.put(`${ENDPOINT_API}/${idEditando.value}`, datosFormulario.value);
          alert('Registro actualizado satisfactoriamente');
        } else {
          await axios.post(ENDPOINT_API, datosFormulario.value);
          alert('Nueva persona registrada exitosamente');
        }
        reiniciarFormulario();
        obtenerPersonas();
      } catch (error) {
        alert('Ocurrió un error: ' + (error.response?.data?.error || 'Error inesperado'));
      }
    };

    const manejarEdicion = (persona) => {
      datosFormulario.value = { ...persona };
      idEditando.value = persona.id;
    };

    const manejarEliminacion = async (id) => {
      if (confirm('¿Confirma que desea eliminar este registro?')) {
        try {
          await axios.delete(`${ENDPOINT_API}/${id}`);
          alert('Registro eliminado correctamente');
          obtenerPersonas();
        } catch {
          alert('No se pudo eliminar el registro');
        }
      }
    };

    const reiniciarFormulario = () => {
      datosFormulario.value = { dni: '', nombres: '', apellidos: '', fecha_nacimiento: '', genero: '', ciudad: '' };
      idEditando.value = null;
      erroresValidacion.value = {};
    };

    const formatearFecha = (fecha) => {
      const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    onMounted(() => {
      obtenerPersonas();
    });

    return {
      datosFormulario,
      listaPersonas,
      idEditando,
      erroresValidacion,
      cargando,
      manejarEnvio,
      manejarEdicion,
      manejarEliminacion,
      reiniciarFormulario,
      formatearFecha
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #d9f0ff 0%, #b2e0ff 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #5dade2;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

h2 {
  color: #48c9b0;
  margin: 30px 0 20px;
}

.form {
  display: grid;
  gap: 20px;
  margin-bottom: 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #5dade2;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
}

.error {
  color: #e67e22; /* naranja suave para errores */
  font-size: 14px;
  margin-top: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit {
  background: #5dade2;
  color: white;
  flex: 1;
}

.btn-submit:hover {
  background: #3498db;
  transform: translateY(-2px);
}

.btn-cancel {
  background: #95a5a6;
  color: white;
}

.btn-cancel:hover {
  background: #7f8c8d;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background: #48c9b0; /* teal suave para encabezados */
  color: white;
  font-weight: 600;
}

.table tr:hover {
  background: #f5f5f5;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  margin-right: 5px;
  font-size: 14px;
}

.btn-edit {
  background: #76d7c4; /* verde agua suave */
  color: white;
}

.btn-edit:hover {
  background: #48c9b0;
}

.btn-delete {
  background: #e67e22; /* naranja suave */
  color: white;
}

.btn-delete:hover {
  background: #d35400;
}

</style>
