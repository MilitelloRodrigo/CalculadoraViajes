# ViajeSplit 🚗💸 — Calculadora Proporcional de Gastos de Viajes

**ViajeSplit** es una aplicación web 100% estática, moderna, ultra-rápida y adaptable ("Mobile-First"), ideal para dividir los gastos de viajes grupales de forma justa y proporcional según la cantidad de veces (o tramos) que haya viajado cada persona. 

Perfecta para cargarse desde el navegador del celular en plena ruta o al regresar de una escapada de fin de semana, guardando todos los datos localmente sin requerir base de datos ni registros.

---

## ✨ Características Principales

- **División Proporcional Exacta**: A diferencia de los divisores comunes, calcula la cuota según la cantidad de tramos/viajes que hizo cada integrante. Si viajaste más, pagás más.
- **Modo Claro y Oscuro**: Se adapta a la preferencia de tu sistema operativo y permite el cambio manual de forma instantánea.
- **Estilo Glassmorphism Premium**: Diseñado con una interfaz visual limpia y elegante usando variables HSL, fuentes modernas y micro-animaciones fluidas.
- **Registro Detallado**: Permite cargar gastos por categorías específicas:
  - 🚗 Nafta / Gasoil
  - 🛣️ Peajes
  - 🍔 Comida
  - 🏨 Hospedaje
  - ⚙️ Otros
- **Liquidación Inteligente**: Aplica un algoritmo optimizado de flujo de efectivo para resolver las deudas con la menor cantidad posible de transferencias (quién le debe a quién).
- **Copiar Resumen para WhatsApp**: Exporta instantáneamente el estado completo de las cuentas, balances y deudas formateado de manera elegante con emojis listo para pegar en el grupo del viaje.
- **Privado y Offline**: Tus datos nunca salen de tu dispositivo. Persisten de forma segura en el `localStorage` del navegador.

---

## 🛠️ Estructura del Código

El proyecto es totalmente autocontenido y estático:
- `index.html`: Estructura semántica, accesibilidad y sprites SVG integrados.
- `style.css`: Estilos visuales adaptables ("Mobile-First"), animaciones y variables de color.
- `app.js`: Motor de cálculo matemático, estado reactivo y algoritmo de liquidación.

---

## 🚀 Despliegue en GitHub Pages

Para subir esta aplicación y usarla gratis en internet:
1. Creá un repositorio público en GitHub (por ejemplo, `CalculadoraViajes`).
2. Subí estos archivos (`index.html`, `style.css`, `app.js`, `README.md`).
3. Ve a la sección **Settings** (Configuración) de tu repositorio.
4. En el menú izquierdo, haz clic en **Pages**.
5. Bajo **Build and deployment**, selecciona la rama `main` (o la principal) y la carpeta `/ (root)`.
6. Haz clic en **Save** (Guardar).
7. ¡Listo! En un par de minutos tu web estará disponible en `https://<tu-usuario>.github.io/CalculadoraViajes/`.

---

## 📝 Ejemplo de Cálculo Proporcional

Imaginen un viaje compartido donde:
1. **Participantes**:
   - **Juan** viajó en **3 tramos**.
   - **Pedro** viajó en **2 tramos**.
   - **Ana** viajó en **1 tramo**.
   - *Total de viajes acumulados en el grupo:* **6 viajes**.

2. **Gastos**:
   - Juan pagó la carga de combustible por **$6.000**.
   - *Costo unitario por viaje:* $6.000 / 6 = **$1.000 por viaje**.

3. **Cálculo de Deudas**:
   - **Juan** (3 viajes): Le corresponde pagar $3.000. Como pagó $6.000, su saldo es **+$3.000 (A favor)**.
   - **Pedro** (2 viajes): Le corresponde pagar $2.000. Como pagó $0, su saldo es **-$2.000 (Debe)**.
   - **Ana** (1 viaje): Le corresponde pagar $1.000. Como pagó $0, su saldo es **-$1.000 (Debe)**.

4. **Liquidación Mínima**:
   - *Pedro le debe pagar $2.000 a Juan.*
   - *Ana le debe pagar $1.000 a Juan.*

---
*Desarrollado para ruteros amantes del viaje libre y las cuentas claras. 🌍✨*
