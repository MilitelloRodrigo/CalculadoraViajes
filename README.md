# Sin Ratonear 🐀💸 — Calculadora de Viajes y Comidas sin mezquindades

**Sin Ratonear** es una aplicación web 100% estática, moderna, ultra-rápida y adaptable ("Mobile-First"), ideal para dividir de manera justa y equitativa los gastos de viajes (proporcional por tramos) y de comidas (en partes iguales) entre amigos o familias.

Diseñada especialmente para abrirse desde el navegador de cualquier celular en plena ruta o al terminar la juntada, guardando todos los datos localmente de forma privada sin requerir base de datos ni registros.

---

## ✨ Características Principales

- **Dos Modalidades en Uno**:
  - 🚗 **Gastos de Viaje (Tramos)**: Calcula la cuota proporcional exacta según la cantidad de tramos/viajes que hizo cada integrante. Si viajaste en todos los tramos pagás más; si te bajaste antes, pagás lo justo.
  - 🍔 **Gastos de Comida (Igualitario)**: Divide los gastos de la comida en partes exactamente iguales entre todos los participantes.
- **Liquidación Inteligente (Algoritmo Greedy)**: Aplica un algoritmo optimizado de flujo de efectivo para resolver las deudas con la menor cantidad posible de transferencias bancarias (quién le debe a quién).
- **Estilo Glassmorphism Premium**: Diseñado con una interfaz visual limpia y elegante usando variables HSL, fuentes modernas, modo oscuro y micro-animaciones fluidas.
- **Copiar Resumen para WhatsApp**: Exporta instantáneamente el estado completo de las cuentas, balances y deudas formateado en formato ultra-compacto listo para pegar en el grupo del viaje o asado.
- **Privado y Offline**: Tus datos nunca salen de tu dispositivo. Persisten de forma segura en el `localStorage` del navegador de cada usuario.

---

## 🧱 Estructura de Código Modular y Moderna

La aplicación está construida sobre estándares web modernos, estructurada de forma modular mediante **Componentes Web Nativos (Custom Elements)** y **Módulos ES6** sin usar frameworks pesados:

- `index.html`: Estructura semántica ultra-limpia basada en Web Components nativos.
- `style.css`: Estilos visuales adaptables ("Mobile-First"), animaciones y variables de color.
- `js/main.js`: Punto de entrada de la aplicación y registro de componentes.
- `js/state.js`: Gestor del estado de la aplicación, persistencia en caché y migraciones.
- `js/math.js`: Motores matemáticos de reparto proporcional, reparto igualitario de comida y liquidación mínima.
- `js/dom.js`: Renderizado dinámico y reactividad en el DOM.
- `js/whatsapp.js`: Compilador de reportes en texto enriquecido listos para copiar.
- `js/utils.js`: Generadores de IDs, formateadores de moneda, sanitizadores y notificaciones flotantes (Toasts).
- `js/components/`: Colección de 10 Componentes Web Nativos que encapsulan los elementos de la interfaz (cabeceras, grilla de métricas, formularios, listas de gastos y liquidaciones).

---

## 🚀 Despliegue en GitHub Pages

Para subir esta aplicación y usarla gratis en internet:
1. Creá un repositorio público en GitHub (por ejemplo, `CalculadoraViajes`).
2. Subí estos archivos (`index.html`, `style.css`, `js/`, `README.md`).
3. Ve a la sección **Settings** (Configuración) de tu repositorio.
4. En el menú izquierdo, haz clic en **Pages**.
5. Bajo **Build and deployment**, selecciona la rama `main` (o la principal) y la carpeta `/ (root)`.
6. Haz clic en **Save** (Guardar).
7. ¡Listo! En un par de minutos tu web estará disponible en `https://<tu-usuario>.github.io/CalculadoraViajes/`.

---

*Desarrollado con ❤️ para grupos de amigos amantes de las cuentas claras y los viajes sin ratonear. 🐀✨*
