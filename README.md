# 🐝 SpyBee - Sistema de Gestión de Proyectos

Aplicación web desarrollada con Next.js para la gestión y visualización de proyectos con mapas interactivos.

## 🚀 Tecnologías Utilizadas

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript
- **Gestión de Estado**: Zustand
- **Mapas**: Mapbox GL JS
- **Estilos**: CSS Modules (CSS Vanilla)
- **Iconos**: React Icons

## ✨ Características Principales

### Funcionalidades Obligatorias
✅ **Listado de Proyectos**: Tabla completa con nombre, plan, estado, equipo e ítems por vencer  
✅ **Paginación**: 10 proyectos por página  
✅ **Búsqueda**: Input de búsqueda en tiempo real  
✅ **Filtros Múltiples**:
- Orden alfabético
- Cantidad de incidencias
- Cantidad de RFI
- Cantidad de tareas

✅ **Mapa Interactivo**: Mapbox GL con marcadores de ubicación de proyectos  
✅ **Navegación en Mapa**: Click en proyecto navega automáticamente a su ubicación

### Puntos Extra Implementados
🎨 **Diseño Responsive**: Totalmente adaptado a dispositivos móviles y tablets  
🔐 **Autenticación**: Sistema de login funcional sin backend

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd spybee-project
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox
```

Para obtener tu token de Mapbox GRATIS:
- Ve a https://account.mapbox.com/
- Regístrate (puedes usar GitHub)
- Copia tu token público
- Pégalo en `.env.local`

O usa este token de demostración:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🔑 Credenciales de Acceso

```
Email: admin@spybee.com
Contraseña: admin123
```

## 📁 Estructura del Proyecto

```
spybee-project/
├── app/                      # App Router de Next.js
│   ├── login/               # Página de login
│   ├── page.tsx             # Página principal
│   └── layout.tsx           # Layout principal
├── components/              # Componentes reutilizables
│   ├── AuthGuard/          # Protección de rutas
│   ├── FilterBar/          # Barra de filtros
│   ├── Header/             # Header con logout
│   ├── Map/                # Mapa de Mapbox
│   ├── Pagination/         # Paginación
│   ├── ProjectList/        # Lista de proyectos
│   ├── SearchBar/          # Búsqueda
│   ├── Sidebar/            # Panel lateral de resumen
│   └── Toast/              # Notificaciones
├── store/                   # Gestión de estado con Zustand
│   ├── authStore.ts        # Estado de autenticación
│   └── projectStore.ts     # Estado de proyectos
├── data/                    # Datos JSON
│   └── projects.json       # Proyectos de prueba
└── styles/                  # Estilos globales
```

## 🎯 Funcionalidades Detalladas

### 1. Gestión de Proyectos
- Visualización en tabla con información completa
- Contador de incidencias, RFI y tareas por proyecto
- Identificación visual de planes y estados
- Avatares de equipo con iniciales

### 2. Búsqueda y Filtros
- Búsqueda por nombre de proyecto
- Filtros por orden alfabético
- Filtros por cantidad de ítems (incidencias, RFI, tareas)
- Reseteo automático de paginación al filtrar

### 3. Mapa Interactivo
- Marcadores con coordenadas reales
- Popups informativos con datos del proyecto
- Navegación animada al seleccionar proyecto
- Controles de zoom y pantalla completa

### 4. Panel de Resumen
- Estadísticas en tiempo real
- Gráficos circulares de progreso
- Lista de próximos eventos
- Responsive en mobile

### 5. Autenticación
- Login con validación
- Persistencia de sesión (localStorage)
- Protección de rutas
- Notificaciones de éxito/error

## 🎨 Buenas Prácticas Implementadas

### React y Next.js
- ✅ Componentes funcionales con hooks
- ✅ Server Components y Client Components apropiadamente
- ✅ App Router de Next.js 15
- ✅ TypeScript para type safety
- ✅ Lazy loading del mapa (performance)

### Gestión de Estado
- ✅ Zustand con persistencia
- ✅ Estado inmutable
- ✅ Separation of concerns

### CSS y Diseño
- ✅ CSS Modules (CSS vanilla puro)
- ✅ Mobile-first approach
- ✅ Variables CSS para consistencia
- ✅ Animaciones y transiciones suaves

### HTML Semántico
- ✅ Uso apropiado de etiquetas HTML5
- ✅ Accesibilidad (ARIA labels)
- ✅ Estructura semántica clara

## 📱 Responsive Design

El diseño se adapta a:
- 📱 **Mobile**: < 768px
- 📱 **Tablet**: 768px - 1024px
- 💻 **Desktop**: > 1024px

Características responsive:
- Navegación optimizada en mobile
- Grid adaptativo en sidebar
- Botón flotante en mobile para sidebar
- Filtros colapsables
- Tabla scrolleable horizontal

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Otras Plataformas
- **Netlify**: Conectar repositorio GitHub
- **Railway**: Deploy desde GitHub
- **CloudFlare Pages**: Deploy automático

Recuerda configurar la variable de entorno `NEXT_PUBLIC_MAPBOX_TOKEN` en tu plataforma de despliegue.

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar linter
```

## 🐛 Troubleshooting

### El mapa no carga
- Verifica que `.env.local` existe y tiene el token
- Reinicia el servidor después de agregar variables de entorno
- Comprueba que el token comienza con `pk.`

### Errores de compilación
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📄 Licencia

Este proyecto es una prueba técnica de demostración.

## 👨‍💻 Autor

Desarrollado como prueba técnica para posición de Frontend Developer.

---

**Stack**: Next.js 15 • React 19 • TypeScript • Zustand • Mapbox GL • CSS Modules
