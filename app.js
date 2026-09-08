const tecnicos = [

    {
        nombre: "Alex Morales",
        certificacion: "Certificación en Redes",
        cargo: "Técnico de Soporte",
        descripcion: "Especialista en diagnóstico y mantenimiento de computadores.",
        foto: "https://i.pravatar.cc/300?img=11"
    },

    {
        nombre: "Camila Torres",
        certificacion: "Certificación en Conectividad",
        cargo: "Técnica de Redes",
        descripcion: "Encargada de soporte de redes y configuración de conexiones.",
        foto: "https://i.pravatar.cc/300?img=47"
    },

    {
        nombre: "Diego Fernández",
        certificacion: "Certificación en Hardware",
        cargo: "Técnico de Hardware",
        descripcion: "Especialista en reparación y mantenimiento de componentes.",
        foto: "https://i.pravatar.cc/300?img=12"
    }

];



const contenedorTecnicos =
    document.getElementById("tecnicos-container");


if (contenedorTecnicos) {

    tecnicos.forEach(function(tecnico) {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("card");

        tarjeta.innerHTML = `

            <img
                src="${tecnico.foto}"
                alt="Foto de ${tecnico.nombre}"
            >

            <h3>
                ${tecnico.nombre}
            </h3>

            <p>
                <strong>${tecnico.cargo}</strong>
            </p>

            <p>
                ${tecnico.certificacion}
            </p>

            <p>
                ${tecnico.descripcion}
            </p>

        `;

        contenedorTecnicos.appendChild(tarjeta);

    });

}

const servicios = [
    {
        nombre: "Diagnóstico de computador",
        descripcion: "Revisión general para detectar problemas de hardware y software.",
        precio: 10000
    },
    {
        nombre: "Mantenimiento preventivo",
        descripcion: "Limpieza y revisión de componentes para mejorar el funcionamiento del equipo.",
        precio: 15000
    },
    {
        nombre: "Instalación de software",
        descripcion: "Instalación y configuración de programas necesarios para el usuario.",
        precio: 8000
    },
    {
        nombre: "Configuración de redes",
        descripcion: "Configuración y revisión de conexiones de red y dispositivos.",
        precio: 20000
    }
];

const serviciosContainer = document.getElementById("servicios-container");

if (serviciosContainer) {

    servicios.forEach(function(servicio) {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <h3>${servicio.nombre}</h3>

            <p>${servicio.descripcion}</p>

            <p>
                <strong>
                    Precio: $${servicio.precio.toLocaleString("es-CL")}
                </strong>
            </p>

            <button class="btn btn-primary">
                Solicitar servicio
            </button>
        `;

        const boton = tarjeta.querySelector("button");

        boton.addEventListener("click", function() {

            const datosGuardados = localStorage.getItem("servicioSeleccionado");

            let datos;

            if (datosGuardados) {
                datos = JSON.parse(datosGuardados);

                if (datos.nombre === servicio.nombre) {
                    datos.cantidad++;
                } else {
                    datos = {
                        nombre: servicio.nombre,
                        precio: servicio.precio,
                        cantidad: 1
                    };
                }

            } else {

                datos = {
                    nombre: servicio.nombre,
                    precio: servicio.precio,
                    cantidad: 1
                };
            }

            datos.total = datos.precio * datos.cantidad;

            localStorage.setItem(
                "servicioSeleccionado",
                JSON.stringify(datos)
            );

            mostrarServicioSeleccionado(datos);
        });

        serviciosContainer.appendChild(tarjeta);
    });
}


function mostrarServicioSeleccionado(datos) {

    const resumen = document.getElementById("resumen-servicios");
    const nombre = document.getElementById("servicio-seleccionado");
    const cantidad = document.getElementById("cantidad-servicio");
    const total = document.getElementById("total-servicio");

    if (!resumen || !nombre || !cantidad || !total) {
        return;
    }

    nombre.textContent = datos.nombre;

    cantidad.textContent = datos.cantidad;

    total.textContent = "$" + datos.total.toLocaleString("es-CL");

    resumen.style.display = "block";
}


const servicioGuardado = localStorage.getItem("servicioSeleccionado");

if (servicioGuardado) {

    const datos = JSON.parse(servicioGuardado);

    mostrarServicioSeleccionado(datos);
}

const formularioContacto = document.getElementById("contacto-form");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const error = document.getElementById("error-contacto");
        const exito = document.getElementById("exito-contacto");

        error.style.display = "none";
        exito.style.display = "none";

        if (nombre.length < 3) {

            error.textContent =
                "El nombre debe tener al menos 3 caracteres.";

            error.style.display = "block";

            return;
        }

        if (telefono.length < 8 || isNaN(telefono)) {

            error.textContent =
                "El teléfono debe contener solamente números y tener al menos 8 dígitos.";

            error.style.display = "block";

            return;
        }

        if (correo.length < 6 || !correo.includes("@")) {

            error.textContent =
                "Ingresa un correo electrónico válido.";

            error.style.display = "block";

            return;
        }

        if (mensaje.length < 10) {

            error.textContent =
                "El mensaje debe tener al menos 10 caracteres.";

            error.style.display = "block";

            return;
        }

        const solicitud = {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            mensaje: mensaje
        };

        localStorage.setItem(
            "solicitudContacto",
            JSON.stringify(solicitud)
        );


        exito.textContent =
            "✓ Solicitud enviada correctamente. Nos pondremos en contacto contigo.";

        exito.style.display = "block";

        formularioContacto.reset();

    });
}
const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();

        const errorLogin = document.getElementById("error-login");

        errorLogin.style.display = "none";

        if (usuario === "admin" && password === "1234") {

            localStorage.setItem("adminLogueado", "true");

            mostrarPanelAdmin();

        } else {

            errorLogin.textContent =
                "Usuario o contraseña incorrectos.";

            errorLogin.style.display = "block";
        }

    });
}


function mostrarPanelAdmin() {

    const loginForm = document.getElementById("login-form");
    const adminPanel = document.getElementById("admin-panel");

    if (!adminPanel) {
        return;
    }

    if (loginForm) {
        loginForm.style.display = "none";
    }

    adminPanel.style.display = "block";

    cargarDatosAdmin();
}



function cargarDatosAdmin() {

    const tabla = document.getElementById("tabla-admin");

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    const servicioGuardado =
        localStorage.getItem("servicioSeleccionado");

    if (!servicioGuardado) {

        tabla.innerHTML = `
            <tr>
                <td colspan="4">
                    No hay servicios registrados.
                </td>
            </tr>
        `;

        return;
    }

    const datos = JSON.parse(servicioGuardado);

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${datos.nombre}</td>

        <td>
            $${datos.precio.toLocaleString("es-CL")}
        </td>

        <td>
            ${datos.cantidad}
        </td>

        <td>
            $${datos.total.toLocaleString("es-CL")}
        </td>
    `;

    tabla.appendChild(fila);
}


const adminLogueado =
    localStorage.getItem("adminLogueado");

if (adminLogueado === "true") {

    mostrarPanelAdmin();
}


const botonCalcular =
    document.getElementById("calcular-presupuesto");

if (botonCalcular) {

    botonCalcular.addEventListener("click", function() {

        const dominio =
            document.getElementById("dominio").value.trim();

        const hosting =
            document.getElementById("hosting").value.trim();

        const tarifa =
            document.getElementById("tarifa").value.trim();

        const horas =
            document.getElementById("horas").value.trim();

        const cpc =
            document.getElementById("cpc").value.trim();

        const clics =
            document.getElementById("clics").value.trim();


        const error =
            document.getElementById("error-finanzas");

        const resultado =
            document.getElementById("resultado-finanzas");

        const advertencia =
            document.getElementById("advertencia-ads");


        error.style.display = "none";
        resultado.style.display = "none";
        advertencia.style.display = "none";



        if (
            dominio === "" ||
            hosting === "" ||
            tarifa === "" ||
            horas === "" ||
            cpc === "" ||
            clics === ""
        ) {

            error.textContent =
                "Completa todos los campos antes de calcular.";

            error.style.display = "block";

            return;
        }


        if (
            isNaN(dominio) ||
            isNaN(hosting) ||
            isNaN(tarifa) ||
            isNaN(horas) ||
            isNaN(cpc) ||
            isNaN(clics)
        ) {

            error.textContent =
                "Todos los valores deben ser numéricos.";

            error.style.display = "block";

            return;
        }

        const costoCapitalHumano =
            Number(tarifa) * Number(horas);

        const costoGoogleAds =
            Number(cpc) * Number(clics);

        const total =
            Number(dominio) +
            Number(hosting) +
            costoCapitalHumano +
            costoGoogleAds;


        resultado.innerHTML = `
            <strong>Presupuesto estimado</strong><br><br>

            Dominio:
            $${Number(dominio).toLocaleString("es-CL")}<br>

            Hosting:
            $${Number(hosting).toLocaleString("es-CL")}<br>

            Capital humano:
            $${costoCapitalHumano.toLocaleString("es-CL")}<br>

            Google Ads:
            $${costoGoogleAds.toLocaleString("es-CL")}<br><br>

            <strong>
                TOTAL:
                $${total.toLocaleString("es-CL")}
            </strong>
        `;

        resultado.style.display = "block";


        if (costoGoogleAds > 50000) {

            advertencia.textContent =
                "⚠️ Presupuesto de marketing alto para fase de lanzamiento";

            advertencia.style.display = "block";
        }

    });
}

const estadoSistema =
    document.getElementById("estado-sistema");

if (estadoSistema) {

    const admin =
        localStorage.getItem("adminLogueado");

    const servicio =
        localStorage.getItem("servicioSeleccionado");


    if (admin === "true") {

        estadoSistema.innerHTML = `
            <span class="estado-admin">
                ✓ Bienvenido, Administrador
            </span>
        `;

    } else if (servicio) {

        const datosServicio =
            JSON.parse(servicio);

        estadoSistema.innerHTML = `
            <span class="estado-servicio">
                ✓ Tienes una solicitud activa:
                ${datosServicio.nombre}
                — Total: $${datosServicio.total.toLocaleString("es-CL")}
            </span>
        `;

    } else {

        estadoSistema.textContent =
            "Sistema TECHCARE disponible para atenderte.";

    }
}

const botonTicket = document.getElementById("generar-ticket");

if (botonTicket) {
    botonTicket.addEventListener("click", function () {

        const nombre = document.getElementById("nombre-ticket").value.trim();
        const tipoFalla = document.getElementById("tipo-falla").value;
        const errorTicket = document.getElementById("error-ticket");

               errorTicket.style.display = "none";

               if (nombre.length < 2) {
            errorTicket.textContent = "Debes ingresar tu nombre.";
            errorTicket.style.display = "block";
            return;
        }

             if (tipoFalla === "") {
            errorTicket.textContent = "Debes seleccionar una categoría de falla.";
            errorTicket.style.display = "block";
            return;
        }

        
        let ultimoNumero = Number(localStorage.getItem("ultimoBoleto")) || 0;

        
        ultimoNumero++;

    
        localStorage.setItem("ultimoBoleto", ultimoNumero);

        const numeroTicket = "B-" + String(ultimoNumero).padStart(3, "0");

    
        const tiempoEspera = ultimoNumero * 15;

      
        const ticket = {
            numero: numeroTicket,
            nombre: nombre,
            tipoFalla: tipoFalla,
            espera: tiempoEspera
        };

       
        localStorage.setItem("ticketSoporte", JSON.stringify(ticket));

        
        const ticketGenerado = document.getElementById("ticket-generado");
        const datosTicket = document.getElementById("datos-ticket");
        const numeroTicketElemento = document.getElementById("numero-ticket");
        const esperaTicket = document.getElementById("espera-ticket");

        ticketGenerado.style.display = "block";

        datosTicket.textContent =
            "Nombre: " + ticket.nombre +
            " | Tipo de falla: " + ticket.tipoFalla;

        numeroTicketElemento.textContent =
            "🎫 Número de atención: " + ticket.numero;

        esperaTicket.textContent =
            "⏱️ Tiempo estimado de espera: " +
            ticket.espera + " minutos";
    });
}
