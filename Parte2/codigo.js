// Mostrar una notificación emergente de éxito o error
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.textContent = message;

    // Estilo de la notificación
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "10px 20px";
    notification.style.color = "#fff";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";

    if (type === "error") {
        notification.style.backgroundColor = "red";
    } else if (type === "success") {
        notification.style.backgroundColor = "green";
    }

    document.body.appendChild(notification);

    // Quitar notificación después de 4 segundos
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Validar formulario
function validateForm(event) {
    event.preventDefault(); // Prevenir el envío automático

    let isValid = true;

    // Limpiar errores previos
    const errorFields = document.querySelectorAll(".error-icon");
    errorFields.forEach(icon => icon.remove());

    // Validar Nombre
    const nombre = document.getElementById("nombre");
    if (!/^[A-Za-z]+$/.test(nombre.value)) {
        isValid = false;
        showFieldError(nombre, "El nombre debe contener solo letras");
    }

    // Validar Apellidos
    const apellidos = document.getElementById("apellidos");
    if (!/^[A-Za-z\s]+$/.test(apellidos.value)) {
        isValid = false;
        showFieldError(apellidos, "Los apellidos deben contener solo letras y espacios");
    }

    // Validar Fecha de Nacimiento
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const today = new Date();
    if (new Date(fechaNacimiento.value) > today) {
        isValid = false;
        showFieldError(fechaNacimiento, "La fecha de nacimiento no puede ser en el futuro");
    }

    // Validar Fecha de Reserva
    const fechaReserva = document.getElementById("fechaReserva");
    if (new Date(fechaReserva.value) < today.setHours(0, 0, 0, 0)) {
        isValid = false;
        showFieldError(fechaReserva, "La fecha de reserva no puede ser pasada");
    }

    // Validar Hora de Reserva
    const horaReserva = document.getElementById("horaReserva");
    const horaSeleccionada = new Date(`${fechaReserva.value}T${horaReserva.value}`);
    const currentTime = new Date();
    if (horaSeleccionada < currentTime) {
        isValid = false;
        showFieldError(horaReserva, "La hora de reserva no puede ser pasada");
    }

    // Validar Teléfono
    const telefono = document.getElementById("telefono");
    if (!/^[0-9]{7,}$/.test(telefono.value)) {
        isValid = false;
        showFieldError(telefono, "El teléfono debe contener al menos 7 dígitos");
    }

    // Validar Correo
    const correo = document.getElementById("correo");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo.value)) {
        isValid = false;
        showFieldError(correo, "El correo debe tener un formato válido");
    }

    // Validar Checkbox
    const acuerdo = document.getElementById("acuerdo");
    if (!acuerdo.checked) {
        isValid = false;
        showFieldError(acuerdo, "Debe aceptar los términos y condiciones");
    }

    // Si todo es válido, mostrar notificación de éxito y limpiar campos
    if (isValid) {
        showNotification("Formulario enviado correctamente", "success");
        limpiarCampos();
    }
}

// Mostrar un icono de error y el mensaje al pasar el cursor o hacer clic
function showFieldError(input, message) {
    input.style.borderColor = "red";

    // Eliminar icono existente
    clearFieldError(input);

    // Crear un contenedor para el icono y el mensaje
    const errorIcon = document.createElement("span");
    errorIcon.textContent = "⚠️"; // Icono de advertencia
    errorIcon.classList.add("error-icon"); // Clase para evitar acumulación de iconos
    errorIcon.style.color = "red";
    errorIcon.style.marginLeft = "10px";
    errorIcon.style.cursor = "pointer";

    // Mostrar mensaje al pasar el mouse por el icono
    errorIcon.title = message;

    // Añadir el icono al lado del campo
    input.parentElement.appendChild(errorIcon);
}

// Limpiar el icono y los errores de un campo
function clearFieldError(input) {
    input.style.borderColor = ""; // Quitar el borde rojo
    const sibling = input.parentElement.querySelector("span");
    if (sibling) {
        sibling.remove(); // Eliminar icono si existe
    }
}

// Limpiar los campos del formulario
function limpiarCampos() {
    const form = document.getElementById("formReserva");
    form.reset(); // Resetea todos los campos del formulario
}

// Asignar validación al evento de envío del formulario
document.getElementById("formReserva").addEventListener("submit", validateForm);

// Selecciona el contenedor del formulario
const formContainer = document.getElementById("formulario");  // Asegúrate de que el id "formulario" esté en el div

// Selecciona el color picker
const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", () => {
    // Cambia el fondo del contenedor del formulario al color seleccionado
    formContainer.style.backgroundColor = colorPicker.value;
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const body = document.body;

    // Verifica si ya hay un tema guardado en el localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.add("light-mode");
    }

    toggleThemeBtn.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        }
    });
});

function actualizarReloj() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // Añadir un 0 a los números menores a 10
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    // Actualizar el contenido del reloj en el contenedor
    document.getElementById('digital-clock').textContent = `${horas}:${minutos}:${segundos}`;
}

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);

// Llamada inicial para mostrar el reloj de inmediato
actualizarReloj();
