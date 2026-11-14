// =============================================================
// EcoTienda: el catalogo y el carrito, con JavaScript
// Cada linea tiene un comentario: QUE hace y PARA QUE.
// =============================================================

const TARIFA = 950;
const DIAS_MES = 30;

const productos = [
    { id: 1, nombre: "Bombillo LED 9W", categoria: "iluminacion", precio: 8900, wattsAntes: 60, wattsDespues: 9, horasDia: 5, imagen: "https://www.ecolite.com.co/wp-content/uploads/2023/04/bombillo-led-5w-rosca-e27-lba605w-1.jpg" },
    { id: 2, nombre: "Panel LED 18W", categoria: "iluminacion", precio: 35000, wattsAntes: 40, wattsDespues: 18, horasDia: 8, imagen: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80" },
    { id: 3, nombre: "Reflector LED 50W", categoria: "iluminacion", precio: 59000, wattsAntes: 250, wattsDespues: 50, horasDia: 6, imagen: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80" },
    { id: 4, nombre: "Nevera Eficiente", categoria: "electrodomesticos", precio: 1890000, wattsAntes: 80, wattsDespues: 40, horasDia: 24, imagen: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" },
    { id: 5, nombre: "Aire Inverter", categoria: "electrodomesticos", precio: 2100000, wattsAntes: 1400, wattsDespues: 900, horasDia: 6, imagen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80" },
    { id: 6, nombre: "Regleta Inteligente", categoria: "electrodomesticos", precio: 65000, wattsAntes: 15, wattsDespues: 0, horasDia: 20, imagen: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&q=80" },
    { id: 7, nombre: "Calentador Solar de Agua", categoria: "solar", precio: 1200000, wattsAntes: 3500, wattsDespues: 0, horasDia: 0.5, imagen: "https://es.gmwaterheater.com/wp-content/uploads/Open-Loop-Flat-Panel-Solar-Water-Heater-1.jpg" },
    { id: 8, nombre: "Panel Solar 550W", categoria: "solar", precio: 2400000, wattsAntes: 550, wattsDespues: 0, horasDia: 4.5, imagen: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80" },
    { id: 9, nombre: "Kit Solar Portátil", categoria: "solar", precio: 850000, wattsAntes: 300, wattsDespues: 0, horasDia: 3, imagen: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=400&q=80" },
    { id: 10, nombre: "Batería Solar Tesla", categoria: "solar", precio: 3500000, wattsAntes: 1000, wattsDespues: 0, horasDia: 8, imagen: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&q=80" },    
    { id: 12, nombre: "Batería Litio", categoria: "insumos", precio: 800000, wattsAntes: 300, wattsDespues: 0, horasDia: 8, imagen: "https://energitelsolar.com/wp-content/uploads/BLF51.jpeg" },
    { id: 13, nombre: "Inversor Solar", categoria: "insumos", precio: 1500000, wattsAntes: 450, wattsDespues: 0, horasDia: 8, imagen: "https://energitelsolar.com/wp-content/uploads/GT3-25KL-T.png" }
];

let carrito = [];
let categoriaActual = "todas";

function ahorroKwhMes(p) { return (p.wattsAntes - p.wattsDespues) * p.horasDia * DIAS_MES / 1000; }
function ahorroPesosMes(p) { return ahorroKwhMes(p) * TARIFA; }
function formatoPesos(v) { return "$" + Math.round(v).toLocaleString("es-CO"); }

function mostrarProductos() {
    const contenedor = document.querySelector("#productos");
    const textoBusqueda = document.querySelector("#buscador").value.toLowerCase();
    contenedor.innerHTML = "";

    for (const p of productos) {
        if (categoriaActual !== "todas" && p.categoria !== categoriaActual) continue;
        if (!p.nombre.toLowerCase().includes(textoBusqueda)) continue;

        contenedor.innerHTML += `
            <article class="tarjeta">
                <img src="${p.imagen}" alt="${p.nombre}" class="producto-img">
                <span class="badge" style="background-color: #FFC145; color: #1F2933; margin-bottom: 8px;">${p.categoria}</span>
                <h3>${p.nombre}</h3>
                <p class="small">Ahorra ${ahorroKwhMes(p).toFixed(1)} kWh al mes.</p>
                <p class="precio">${formatoPesos(p.precio)}</p>
                <p class="text-success small fw-bold">Ahorro: ${formatoPesos(ahorroPesosMes(p))}/mes</p>
                <button class="btn btn-sm w-100 text-white" style="background-color: #5CB338;" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
            </article>`;
    }
}

function agregarAlCarrito(id) {
    const p = productos.find(prod => prod.id === id);
    if (p) { carrito.push(p); mostrarCarrito(); }
}

function mostrarCarrito() {
    const lista = document.querySelector("#lista-carrito");
    lista.innerHTML = "";
    let total = 0;
    let ahorro = 0;

    for (const p of carrito) {
        lista.innerHTML += `<li class="border-bottom py-1">${p.nombre} - ${formatoPesos(p.precio)}</li>`;
        total += p.precio;
        ahorro += ahorroPesosMes(p);
    }

    document.querySelector("#total").textContent = "Total: " + formatoPesos(total);
    if (carrito.length === 0) {
        document.querySelector("#ahorro").textContent = "El carrito está vacío.";
    } else {
        const meses = Math.ceil(total / ahorro);
        document.querySelector("#ahorro").textContent = `Ahorro: ${formatoPesos(ahorro)}/mes (Se paga en ${meses} meses)`;
    }
}

document.querySelector("#buscador").addEventListener("input", mostrarProductos);

document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", function() {
        document.querySelectorAll(".filtro").forEach(b => b.classList.remove("activo"));
        this.classList.add("activo");
        categoriaActual = this.dataset.categoria;
        mostrarProductos();
    });
});

document.querySelector("#vaciar").addEventListener("click", () => { carrito = []; mostrarCarrito(); });

mostrarProductos();
mostrarCarrito();
