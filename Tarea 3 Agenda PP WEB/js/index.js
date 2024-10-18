function cargarContactos() {
    fetch("https://www.raydelto.org/agenda.php")
        .then(response => response.json())
        .then(contactos => {
            const contactosDiv = document.getElementById('contactos');
            contactosDiv.innerHTML = '';
            contactos.forEach(contacto => agregarContactoADom(contacto));
        })
        .catch(error => {
            console.error('Error al cargar los contactos:', error);
            document.getElementById('contactos').innerHTML = 'Error al cargar los contactos.';
        });
}

function enviarContacto() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    if (!nombre || !apellido || !telefono) {
        mostrarMensaje('Por favor complete todos los campos.', 'error');
        return false;
    }

    const data = { nombre, apellido, telefono };

    fetch('https://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        if (result.includes("exito")) {
            mostrarMensaje('Contacto agregado exitosamente.', 'success');
            agregarContactoADom(data);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('telefono').value = '';
        } else {
            mostrarMensaje('No se pudo agregar el contacto.', 'error');
        }
    })
    .catch(error => {
        console.error('Error al agregar contacto:', error);
        mostrarMensaje('Ocurrió un error al agregar el contacto.', 'error');
    });

    return false;
}

function agregarContactoADom(contacto) {
    const contactosDiv = document.getElementById('contactos');
    contactosDiv.innerHTML += `<p>${contacto.nombre} ${contacto.apellido} - ${contacto.telefono}</p>`;
}

function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.getElementById('mensaje');
    divMensaje.innerHTML = mensaje;
    divMensaje.style.color = tipo === 'success' ? 'green' : 'red';
    setTimeout(() => divMensaje.innerHTML = '', 6000);
}
