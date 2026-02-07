const clientes = ["Abraham", "Carlos", "Cristián", "Enrrique", "Giovanni", "Gonzalo", "Jean", "Juanjo", "Julian", "Juanito", "Miguel", "Vicente", "Willians"];

const ingredientes = ["Lomo", "Pechuga de pollo", "Pechuga empanada", "Hamburguesa", "Bacon", "Queso", "Longaniza", "Tortilla de patata", "Tortilla de patata con cebolla", "Ajo aceite", "Mayonesa", "Huevo", "Pimiento", "Tomate", "Lechuga"];

// Poblar selects y lista
const selectCliente = document.getElementById('cliente-select');
const divIngredientes = document.getElementById('lista-ingredientes');

clientes.sort().forEach(c => {
    let opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    selectCliente.appendChild(opt);
});

ingredientes.forEach(ing => {
    let label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${ing}"> ${ing}`;
    divIngredientes.appendChild(label);
});

function generarPedido() {
    const nombre = selectCliente.value;
    const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (!nombre) {
        alert("Por favor, selecciona tu nombre.");
        return;
    }
    if (seleccionados.length === 0) {
        alert("Elige al menos un ingrediente.");
        return;
    }

    document.getElementById('nombre-ticket').textContent = nombre;
    const listaTicket = document.getElementById('ingredientes-ticket');
    listaTicket.innerHTML = "";
    
    seleccionados.forEach(ing => {
        let li = document.createElement('li');
        li.textContent = ing;
        listaTicket.appendChild(li);
    });

    document.getElementById('resultado').classList.remove('resultado-oculto');
    window.scrollTo(0, document.body.scrollHeight);
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado con éxito', reg))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}
// SUSTITUYE EL NÚMERO DE EJEMPLO POR EL TUYO:
const TELEFONO_ENCARGADO = "34600000000"; 

function generarPedido() {
    const nombre = selectCliente.value;
    const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (!nombre) {
        alert("Por favor, selecciona tu nombre.");
        return;
    }
    if (seleccionados.length === 0) {
        alert("Elige al menos un ingrediente.");
        return;
    }

    // Mostrar el ticket en la pantalla de la web
    document.getElementById('nombre-ticket').textContent = nombre;
    const listaTicket = document.getElementById('ingredientes-ticket');
    listaTicket.innerHTML = "";
    
    seleccionados.forEach(ing => {
        let li = document.createElement('li');
        li.textContent = ing;
        listaTicket.appendChild(li);
    });

    document.getElementById('resultado').classList.remove('resultado-oculto');

    // ENVIAR DIRECTO A WHATSAPP
    const mensaje = `*PEDIDO DE BOCADILLO*\n` +
                    `--------------------------\n` +
                    `👤 *Cliente:* ${nombre}\n` +
                    `🥖 *Ingredientes:* \n- ${seleccionados.join('\n- ')}`;

    const mensajeURL = encodeURIComponent(mensaje);
    const url = `https://api.whatsapp.com/send?phone=${TELEFONO_ENCARGADO}&text=${mensajeURL}`;

    // Abrir WhatsApp automáticamente
    setTimeout(() => {
        window.open(url, '_blank');
    }, 500);
}
