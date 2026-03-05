const clientes = ["Abraham", "Carlos", "Cristián", "Enrrique", "Giovanni", "Gonzalo", "Jean", "Juanjo", "Juanito", "Julian", "Miguel", "Vicente", "Willians"];

const ingredientes = ["Lomo", "Pechuga de pollo", "Pechuga empanada", "Hamburguesa", "Ternera", "Bacon", "Queso", "Longaniza", "Tortilla de patata", "Tortilla de patata con cebolla", "Patatas", "Ajo aceite", "Mayonesa", "Huevo", "Pimiento", "Tomate", "Lechuga", "En plato"];

const bebidas = ["Cocacola", "Cocacola cero", "Fanta", "Aquarius", "Agua", "Neste", "Zumo de piña", "Vino y gaseosa", "Cerveza", "Agua con Gas", "Cerveza 00"];

const cafes = ["Café solo", "Cortado", "Café americano", "Café con leche caliente", "Café solo tocado de wisky", "Carajillo", "Bombón", "Bombón tocado", "Te negro", "Manzanilla", "Menta poleo"];

const TELEFONO_ENCARGADO = "34655402581"; // PON AQUÍ EL TELÉFONO

// Poblar los elementos al cargar
document.addEventListener('DOMContentLoaded', () => {
    const selectCliente = document.getElementById('cliente-select');
    const divIngredientes = document.getElementById('lista-ingredientes');
    const selectBebida = document.getElementById('bebida-select');
    const selectCafe = document.getElementById('cafe-select');

    clientes.sort().forEach(c => {
        let opt = document.createElement('option');
        opt.value = c; opt.textContent = c;
        selectCliente.appendChild(opt);
    });

    ingredientes.forEach(ing => {
        let label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="check-ing" value="${ing}"> ${ing}`;
        divIngredientes.appendChild(label);
    });

    bebidas.forEach(b => {
        let opt = document.createElement('option');
        opt.value = b; opt.textContent = b;
        selectBebida.appendChild(opt);
    });

    cafes.forEach(c => {
        let opt = document.createElement('option');
        opt.value = c; opt.textContent = c;
        selectCafe.appendChild(opt);
    });
});

function generarPedido() {
    const nombre = document.getElementById('cliente-select').value;
    const seleccionados = Array.from(document.querySelectorAll('.check-ing:checked')).map(cb => cb.value);
    const bebida = document.getElementById('bebida-select').value;
    const cafe = document.getElementById('cafe-select').value;

    if (!nombre) return alert("Selecciona tu nombre");
    if (seleccionados.length === 0) return alert("Elige al menos un ingrediente para el bocadillo");

    // Formato del mensaje para WhatsApp
    const mensaje = `🥪 *PEDIDO DE ALMUERZO*\n` +
                    `--------------------------\n` +
                    `👤 *Cliente:* ${nombre}\n\n` +
                    `🥖 *Bocadillo:* ${seleccionados.join(', ')}\n` +
                    `🥤 *Bebida:* ${bebida}\n` +
                    `☕ *Café:* ${cafe}`;

    const url = `https://api.whatsapp.com/send?phone=${TELEFONO_ENCARGADO}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function limpiarFormulario() {
    document.getElementById('cliente-select').selectedIndex = 0;
    document.getElementById('bebida-select').selectedIndex = 0;
    document.getElementById('cafe-select').selectedIndex = 0;
    document.querySelectorAll('.check-ing').forEach(cb => cb.checked = false);
    document.getElementById('resultado').classList.add('resultado-oculto');
    window.scrollTo(0, 0);
}

