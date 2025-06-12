async function cargarEmpresas() {
  try {
    const res = await fetch('/api/empresas');
    const empresas = await res.json();

    const tbody = document.querySelector('#tablaEmpresas tbody');
    tbody.innerHTML = '';

empresas.forEach(e => {
  const tr = document.createElement('tr');

  tr.setAttribute('data-id-empresa', e.id);

  tr.innerHTML = `
    <td>${e.nombre}</td>
    <td>${e.cif}</td>
    <td>${e.sector}</td>
    <td>
      <button onclick="verTrabajadoresDeEmpresa(${e.id})">
        Ver trabajadores
      </button>
    </td>
  `;

  tbody.appendChild(tr);
});

    const selector = document.getElementById('empresaTrabajador');
    selector.innerHTML = '<option value="">-- Selecciona una empresa --</option>';
    empresas.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = e.nombre;
      selector.appendChild(opt);
    });

  } catch (err) {
    console.error('Error al cargar empresas:', err);
  }
}

document.getElementById('formEmpresaForm')
  .addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value,
      cif: document.getElementById('cif').value,
      sector: document.getElementById('sector').value
    };
    try {
      await fetch('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      e.target.reset();
      cargarEmpresas();
      alert('Empresa creada correctamente');
    } catch (err) {
      console.error('Error al crear empresa:', err);
      alert('No se pudo crear empresa.\n' + err.message);
    }
  });




// Mostrar sección trabajadores
function mostrarSeccionTrabajadores() {
  document.getElementById('seccionEmpresas').style.display = 'none';
  document.getElementById('seccionTrabajadores').style.display = 'block';
  cargarTrabajadores();
}



// Cargar trabajadores
async function cargarTrabajadores() {
  try {
    const res = await fetch('/api/trabajadores');
    const trs = await res.json();
    const tbody = document.querySelector('#tablaTrabajadores tbody');
    tbody.innerHTML = '';
    trs.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.nombre}</td>
        <td>${t.apellidos}</td>
        <td>${t.profesion||'-'}</td>
        <td>${t.empresa?.nombre||'Sin empresa'}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar trabajadores:', err);
  }
}

// Crear trabajador
document.getElementById('formTrabajadorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

   const datosCompletos = {
    nombre_usuario: document.getElementById('nombreUsuario').value,
    contraseña: document.getElementById('passwordUsuario').value,
    rol: 'trabajador',
    nombre: document.getElementById('nombreTrabajador').value,
    apellidos: document.getElementById('apellidosTrabajador').value,
    profesion: document.getElementById('profesionTrabajador').value,
    id_empresa: parseInt(document.getElementById('empresaTrabajador').value)
  };

  try {
    const res = await fetch('/api/trabajadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCompletos)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detalles || 'Error desconocido');
    }

    const data = await res.json();
    console.log('Trabajador creado:', data);
    alert('Trabajador creado correctamente');
    document.getElementById('formTrabajadorForm').reset();
    cargarTrabajadores();
  } catch (error) {
    console.error('Error al crear trabajador:', error);
    alert('No se pudo crear el trabajador.\n' + error.message);
  }
});

async function cargarViviendas() {
  try {
    const res = await fetch('/api/viviendas');
    const vs = await res.json();
    const tbody = document.querySelector('#tablaViviendas tbody');
    tbody.innerHTML = '';
    vs.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.direccion}</td>
        <td>${v.escalera}</td>
        <td>${v.piso}</td>
        <td>${v.letra}</td>
        <td>${v.habitaciones}</td>
        <td>${v.metros_cuadrados}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch(err) {
    console.error('Error al cargar viviendas:', err);
  }
}

document.getElementById('formViviendaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    direccion: document.getElementById('direccion').value,
    escalera: document.getElementById('escalera').value,
    piso: document.getElementById('piso').value,
    letra: document.getElementById('letra').value,
    habitaciones: document.getElementById('habitaciones').value,
    metros_cuadrados: document.getElementById('metros_cuadrados').value,
    observaciones: document.getElementById('observaciones').value,
  };

  try {
    await fetch('/api/viviendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    e.target.reset();
    cargarViviendas();
    alert('Vivienda creada correctamente');
  } catch (error) {
    console.error('Error al crear vivienda:', error);
    alert('No se pudo crear la vivienda.\n' + error.message);
  }
});

// Crear inquilino
document.getElementById('formInquilinoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datosCompletos = {
    nombre_usuario: document.getElementById('nombreUsuarioInquilino').value,
    contraseña: document.getElementById('passwordUsuarioInquilino').value,
    rol: 'inquilino',

    nombre: document.getElementById('nombreInquilino').value,
    apellidos: document.getElementById('apellidosInquilino').value,
    fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
    dni: document.getElementById('dni').value,
    vivienda_id: document.getElementById('viviendaInquilino').value
  };

  try {
    const res = await fetch('/api/inquilinos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCompletos)
    });

    if (!res.ok) throw new Error('Error al crear inquilino');

    const data = await res.json();
    console.log('Inquilino creado:', data);
    alert('Inquilino creado correctamente');
    document.getElementById('formInquilinoForm').reset();
    cargarInquilinos();
  } catch (error) {
    console.error('Error al crear inquilino:', error);
    alert('No se pudo crear el inquilino.\n' + error.message);
  }
});

async function cargarInquilinos() {
  try {
    const res = await fetch('/api/inquilinos');
    const ins = await res.json();
    const tbody = document.querySelector('#tablaInquilinos tbody');
    tbody.innerHTML = '';

    ins.forEach(i => {
      const viviendaTexto = i.vivienda
        ? `${i.vivienda.direccion || '-'} Esc. ${i.vivienda.escalera || '-'}, Piso ${i.vivienda.piso || '-'}, Letra ${i.vivienda.letra || '-'}`
        : 'Sin vivienda';

      const tr = document.createElement('tr');
      tr.setAttribute('data-id-inquilino', i.id);
      
      tr.innerHTML = `
        <td>${i.nombre}</td>
        <td>${i.apellidos}</td>
        <td>${i.fecha_nacimiento}</td>
        <td>${i.dni}</td>
        <td>${viviendaTexto}</td>
         <td>
          <button onclick="mostrarSelectorVivienda(${i.id})">Asignar casa</button>
          <div id="selector-${i.id}" style="display:none; margin-top:5px;"></div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar inquilinos:', err);
  }
}

function mostrarSeccion(id, event = null) {
  if (event) event.preventDefault();

  document.querySelectorAll("#main section").forEach(seccion => {
    seccion.style.display = "none";
  });

  const hero = document.querySelector(".hero");
  const opciones = document.querySelector(".opciones");
  if (hero) hero.style.display = "none";
  if (opciones) opciones.style.display = "none";

  const objetivo = document.getElementById(id);
  if (objetivo) {
    objetivo.style.display = "block";

    const desdeCard = event?.target?.closest(".card");

    if (desdeCard) {
      const titulo = objetivo.querySelector("h1, h2, h3");
      if (titulo) {
        titulo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        objetivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  document.querySelectorAll("#nav ul li a").forEach(link => {
    link.classList.remove("active");
  });

  const enlaceActivo = document.querySelector(`#nav ul li a[onclick*="${id}"]`);
  if (enlaceActivo) enlaceActivo.classList.add("active");

  if (id === 'seccionEmpresas') mostrarSubseccion('listadoEmpresas');
  if (id === 'seccionTrabajadores') mostrarSubseccion('listadoTrabajadores');
  if (id === 'crearVivienda') mostrarSubseccion('listadoViviendas');
  if (id === 'seccionInquilinos') mostrarSubseccion('listadoInquilinos');
}


  function mostrarSubseccion(id) {
  const contenedores = [
    'listadoEmpresas', 'formEmpresa',
    'listadoTrabajadores', 'formTrabajador',
    'listadoViviendas', 'formVivienda',
    'listadoInquilinos', 'formInquilino'
  ];

  // Mapeo de formulario → sección que contiene el botón
  const mapaSecciones = {
    formEmpresa: 'seccionEmpresas',
    formTrabajador: 'seccionTrabajadores',
    formVivienda: 'crearVivienda',
    formInquilino: 'seccionInquilinos'
  };

  // Averiguamos si el formulario ya estaba visible
  const mostrar = document.getElementById(id);
  const estabaVisible = mostrar.style.display === 'block';

  // Ocultamos siempre todas las listas y formularios
  contenedores.forEach(divId => {
    const div = document.getElementById(divId);
    if (div) div.style.display = 'none';
  });

  // Si el formulario ya estaba abierto, volvemos a la lista
  if (estabaVisible) {
    if (id === 'formEmpresa') {
      document.getElementById('listadoEmpresas').style.display = 'block';
    } else if (id === 'formTrabajador') {
      document.getElementById('listadoTrabajadores').style.display = 'block';
    } else if (id === 'formVivienda') {
      document.getElementById('listadoViviendas').style.display = 'block';
    } else if (id === 'formInquilino') {
      document.getElementById('listadoInquilinos').style.display = 'block';
    }
  } else {
    // Si estaba cerrado, mostramos el formulario
    mostrar.style.display = 'block';
  }

  // Ahora actualizamos el icono y tooltip del botón correspondiente
  const seccionBoton = mapaSecciones[id];
  if (seccionBoton) {
    const cont = document.getElementById(seccionBoton);
    const btn = cont.querySelector('.boton-agregar');
    if (btn) {
      const icono = btn.querySelector('.material-symbols-outlined');
      if (estabaVisible) {
        // estaba abierto → cerramos → volvemos al "+"
        btn.setAttribute('data-tooltip', 'Agregar nuevo');
        icono.textContent = 'add';
      } else {
        // estaba cerrado → abrimos → mostramos "−"
        btn.setAttribute('data-tooltip', 'Volver a la lista');
        icono.textContent = 'remove';
      }
    }
  }
}


    
    function mostrarFormulario(id) {
     const form = document.getElementById(id);
  if (!form) return;
  form.style.display = (form.style.display === 'block') ? 'none' : 'block';
}

async function verTrabajadoresDeEmpresa(idEmpresa) {
  const filaEmpresa = document.querySelector(`tr[data-id-empresa="${idEmpresa}"]`);
  if (!filaEmpresa) return;

  const siguiente = filaEmpresa.nextElementSibling;
  if (siguiente && siguiente.classList.contains('subrow')) {
    siguiente.remove();
    return;
  }

  try {
 
    const res = await fetch(`/api/trabajadores?empresa=${idEmpresa}`);
    const trabajadores = await res.json();

    const subFila = document.createElement('tr');
    subFila.classList.add('subrow');

    const celda = document.createElement('td');
    celda.setAttribute('colspan', 4); // 4 columnas: Nombre, CIF, Sector, Acción

    let html = `
      <table class="inner-table">
        <thead>
          <tr>
            <th>Nombre</th><th>Apellidos</th><th>Profesión</th>
          </tr>
        </thead>
        <tbody>
    `;
    trabajadores.forEach(t => {
      html += `
        <tr>
          <td>${t.nombre}</td>
          <td>${t.apellidos}</td>
          <td>${t.profesion || '-'}</td>
        </tr>
      `;
    });
    html += `</tbody></table>`;

    celda.innerHTML = html;
    subFila.appendChild(celda);

    filaEmpresa.parentNode.insertBefore(subFila, filaEmpresa.nextSibling);

  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
  }
}
async function cargarViviendasDisponibles() {
  try {
    const res = await fetch('/api/viviendas?disponible=true');
    const viviendas = await res.json();

    const selector = document.getElementById('viviendaInquilino');
    selector.innerHTML = '<option value="">-- Selecciona una vivienda disponible --</option>';

    viviendas.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = `${v.direccion} - Esc. ${v.escalera || '-'} - Piso ${v.piso || '-'} - Letra ${v.letra || '-'}`;
      selector.appendChild(option);
      console.log('Respuesta recibida:', viviendas);
    });
  } catch (error) {
    console.error('Error al cargar viviendas disponibles:', error);
  }
}
async function mostrarSelectorVivienda(idInquilino) {
  try {
    const div = document.getElementById(`selector-${idInquilino}`);
    div.innerHTML = 'Cargando...';
    div.style.display = 'block';

    const res = await fetch('/api/viviendas?disponible=true');
    const viviendas = await res.json();

    const select = document.createElement('select');
    select.innerHTML = '<option value="">-- Selecciona vivienda --</option>';
    viviendas.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = `${v.direccion} Esc. ${v.escalera || '-'} Piso ${v.piso || '-'} Letra ${v.letra || '-'}`;
      select.appendChild(option);
    });

    const btn = document.createElement('button');
    btn.textContent = 'Asignar';
    btn.onclick = async () => {
      const vivienda_id = select.value;
      if (!vivienda_id) {
        alert('Selecciona una vivienda');
        return;
      }

      try {
        const res = await fetch(`/api/inquilinos/${idInquilino}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vivienda_id})
        });

        if (!res.ok) throw new Error('No se pudo asignar la vivienda');

        // Cargar los datos actualizados de ese inquilino
        const datosActualizados = await fetch(`/api/inquilinos/${idInquilino}`);
        if (!datosActualizados.ok) {
  const texto = await datosActualizados.text(); // Esto NO lanza error
  console.error('Respuesta no OK:', texto);
  throw new Error('No se pudo obtener los datos del inquilino');
}
      let inquilino;
        try {
          inquilino = await datosActualizados.json();
        } catch (err) {
          const texto = await datosActualizados.text();
          console.error('Respuesta no es JSON válida:', texto);
          alert('Error al obtener los datos del inquilino');
          return; // Salgo si no se pudo obtener el JSON
        }

        // Obtener texto formateado de la vivienda
        const viviendaTexto = inquilino.vivienda
          ? `${inquilino.vivienda.direccion || '-'} Esc. ${inquilino.vivienda.escalera || '-'}, Piso ${inquilino.vivienda.piso || '-'}, Letra ${inquilino.vivienda.letra || '-'}`
          : 'Sin vivienda asignada';

        // Actualizamos solo la celda de la vivienda en la fila
        const fila = document.querySelector(`#tablaInquilinos tr[data-id-inquilino="${idInquilino}"]`);
        fila.cells[4].textContent = viviendaTexto;

        // Ocultamos el selector
        div.style.display = 'none';
        alert('Vivienda asignada correctamente');

      } catch (error) {
        console.error('Error al asignar vivienda:', error);
        alert('Error al asignar vivienda');
      }
    };

    div.innerHTML = ''; 
    div.appendChild(select);
    div.appendChild(btn);

  } catch (err) {
    console.error('Error al mostrar selector:', err);
    alert('Error al obtener viviendas disponibles');
  }
}
function mostrarOpciones(event) {
  if (event) event.preventDefault();

  const opciones = document.getElementById("panel");
  const hero = document.querySelector(".hero");

  if (opciones) opciones.style.display = "flex";  // Mostrar tarjetas
  if (hero) hero.style.display = "none";           // Ocultar la sección de bienvenida

  // Desplaza suavemente hasta las opciones
  opciones.scrollIntoView({ behavior: 'smooth', block: 'start' });
}



window.addEventListener("DOMContentLoaded", () => {
  // Mostrar solo la sección hero
  const hero = document.querySelector(".hero");
  const opciones = document.querySelector(".opciones");
  const secciones = document.querySelectorAll("#main section");

  if (hero) hero.style.display = "flex";
if (opciones) opciones.style.display = "none";


  secciones.forEach(sec => {
    sec.style.display = "none";
  });
});

async function verDetallesIncidencia(idIncidencia) {
  const fila = document.querySelector(`tr[data-id-incidencia="${idIncidencia}"]`);
  const existente = fila.nextElementSibling;
  if (existente && existente.classList.contains('subrow')) {
    existente.remove();
    return;
  }

  document.querySelectorAll('.subrow').forEach(r => r.remove());

  try {
    const [resIncidencias, resViviendas, resTrabajadores] = await Promise.all([
      fetch('/api/incidencias'),
      fetch('/api/viviendas'),
      fetch('/api/trabajadores')
    ]);

    const [incidencias, viviendas, trabajadores] = await Promise.all([
      resIncidencias.json(),
      resViviendas.json(),
      resTrabajadores.json()
    ]);

    const incidencia = incidencias.find(i => parseInt(i.id) === parseInt(idIncidencia));
    const subFila = document.createElement('tr');
    subFila.classList.add('subrow');

    const celda = document.createElement('td');
    celda.setAttribute('colspan', 4);

    celda.innerHTML = `
      <form onsubmit="guardarIncidencia(event, ${idIncidencia})">
        <table class="inner-table">
          <thead>
            <tr>
              <th>Vivienda</th>
              <th>Trabajador</th>
              <th>Fecha visita</th>
              <th>Descripción</th>
              <th>¿Solucionada?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select name="id_vivienda">
                  ${viviendas.map(v => `
                    <option value="${v.id}" ${v.id === incidencia.id_vivienda ? 'selected' : ''}>${v.direccion}</option>
                  `).join('')}
                </select>
              </td>
              <td>
                <select name="id_trabajador">
                  ${trabajadores.map(t => `
                    <option value="${t.id}" ${t.id === incidencia.id_trabajador ? 'selected' : ''}>
                      ${t.nombre} ${t.apellidos}
                    </option>
                  `).join('')}
                </select>
              </td>
              <td>
                <input type="datetime-local" name="fecha_visita" value="${incidencia.fecha_visita ? new Date(incidencia.fecha_visita).toISOString().slice(0,16) : ''}">
              </td>
              <td>
                <textarea name="descripcion" rows="2">${incidencia.descripcion || ''}</textarea>
              </td>
              <td style="text-align: center;">
                <input type="checkbox" name="solucionada" ${incidencia.solucionada ? 'checked' : ''}>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <button type="submit">Guardar cambios</button>
      </form>
    `;

    subFila.appendChild(celda);
    fila.parentNode.insertBefore(subFila, fila.nextSibling);

  } catch (err) {
    console.error('Error al cargar detalles de incidencia:', err);
  }
}

async function guardarIncidencia(e, id) {
  e.preventDefault();
  const form = e.target;

  const data = {
    id_vivienda: parseInt(form.id_vivienda.value),
    id_trabajador: parseInt(form.id_trabajador.value),
    fecha_visita: form.fecha_visita.value || null,
    descripcion: form.descripcion.value || '',
    solucionada: form.solucionada.checked
  };

  try {
    await fetch(`/api/incidencias/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    alert('Incidencia actualizada correctamente');
    cargarIncidencias();
  } catch (err) {
    console.error('Error al actualizar incidencia:', err);
    alert('No se pudo guardar la incidencia.\n' + err.message);
  }
}

async function cargarIncidencias() {
  try {
    const [resIncidencias, resViviendas, resTrabajadores] = await Promise.all([
      fetch('/api/incidencias'),
      fetch('/api/viviendas'),
      fetch('/api/trabajadores')
    ]);

    const [incidencias, viviendas, trabajadores] = await Promise.all([
      resIncidencias.json(),
      resViviendas.json(),
      resTrabajadores.json()
    ]);

    const tbody = document.querySelector('#tablaIncidencias tbody');
    tbody.innerHTML = '';

    incidencias.forEach(i => {
      const vivienda = viviendas.find(v => v.id === i.id_vivienda);
      const trabajador = trabajadores.find(t => t.id === i.id_trabajador);

      const tr = document.createElement('tr');
      tr.setAttribute('data-id-incidencia', i.id);
      tr.innerHTML = `
        <td>${vivienda?.direccion || 'Sin dirección'}</td>
        <td>${trabajador ? `${trabajador.nombre} ${trabajador.apellidos}` : 'Sin trabajador'}</td>
        <td>${i.solucionada ? 'Sí' : 'No'}</td>
        <td><button onclick="verDetallesIncidencia(${i.id})">Ver detalles</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar incidencias:', err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Muestro la sección de empresas
  mostrarSeccion("seccionEmpresas");
  // Lleno todas las tablas/listas ya que el DOM está listo
  cargarEmpresas();
  cargarTrabajadores();
  cargarViviendas();
  cargarInquilinos();
  cargarViviendasDisponibles();
});