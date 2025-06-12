async function getVivienda() {
    let id_inquilino = getCookie('id_usuario');
    const inquilino = await getInquilino(id_inquilino);
    try {
        const res = await fetch(`/api/vivienda/${encodeURIComponent(inquilino.vivienda_id)}`);
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        const vivienda = await res.json();

        const viviendaInput = document.getElementById("vivienda");
        const viviendaIdInput = document.getElementById("id_vivienda");

        if (viviendaInput && viviendaIdInput) {
            viviendaInput.value = vivienda.direccion;
            viviendaIdInput.value = vivienda.id;
        }

        console.log("La vivienda:", vivienda);
    } catch (error) {
        console.error("Error al obtener la vivienda:", error.message);
        return null;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function getInquilino(id_inquilino) {
    try {
        const res = await fetch(`/api/inquilino/${encodeURIComponent(id_inquilino)}`);
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener el inquilino:", error.message);
        return null;
    }
}

document.getElementById("formIncidencia").addEventListener("submit", async function (event) {
    event.preventDefault();
    try {

        const id_vivienda = document.getElementById("id_vivienda").value;
        const descripcion = document.getElementById("descripcion").value;

        const incidenciaData = {
            id_vivienda,
            descripcion
        };

        // Realizar la solicitud con fetch
        const res = await fetch("/api/incidencias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incidenciaData)
        });

        // Manejo de la respuesta
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);

        const data = await res.json();
        console.log("Incidencia creada:", data);

        // Opcional: Mensaje de éxito
        alert("Incidencia creada correctamente!");

        // Opcional: Redirigir o limpiar el formulario
        document.getElementById("formIncidencia").reset();

    } catch (error) {
        console.error("Error al enviar la incidencia:", error.message);
        alert("Hubo un error al crear la incidencia.");
    }
});
async function getIncidencias() {
    let id_inquilino = getCookie('id_usuario');
    const inquilino = await getInquilino(id_inquilino);
    try {
        const res = await fetch(`/api/incidencias?id_vivienda=${encodeURIComponent(inquilino.vivienda_id)}`);
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        const incidencias = await res.json();
        console.log("Las incidencias: ", incidencias)
        const tabla = document.getElementById("tabla-incidencias");
        incidencias.forEach(incidencia => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${new Date(incidencia.created_at).toLocaleDateString()}</td>
                <td>${incidencia.descripcion}</td>
                <td>${incidencia.fecha_visita ? new Date(incidencia.fecha_visita).toLocaleDateString() : "No programada"}</td>
                <td>${incidencia.id_trabajador ? `${incidencia.trabajador.nombre} ${incidencia.trabajador.apellidos}` : "Sin asignar"}</td>
                <td>${incidencia.solucionada ? "Resuelta" : "Pendiente"}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener las incidencias:", error.message);
        return null;
    }

}

getIncidencias();
getVivienda();