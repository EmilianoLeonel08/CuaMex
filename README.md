# CuaMex

Plataforma web de recomendaciones culinarias para la Ciudad de México. Permite a los usuarios explorar restaurantes, escribir reseñas y calificar con estrellas.

## Características

- Autenticación de usuarios con JWT
- Sistema de reseñas y calificaciones (1-5 estrellas)
- Panel de administración para gestión de usuarios
- Interfaz responsiva con diseño moderno
- Base de datos MongoDB para persistencia

## Tecnologías

- Next.js 15.5.3
- React 19.1.0
- MongoDB 6.19.0
- JWT para autenticación
- bcrypt para encriptación de contraseñas

## Vista rápida sin base de datos

Si solo quieres ver la interfaz web sin configurar la base de datos:

Requisitos previos: Node.js y npm (si no tienes npm instalado, descarga Node.js desde https://nodejs.org)

1. Clona el repositorio:
```bash
git clone https://github.com/EmilianoLeonel08/CuaMex.git
cd CuaMex
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta directamente:
```bash
npm run dev
```

4. Ve a http://localhost:3000

Nota: Sin base de datos puedes navegar por la interfaz, pero no funcionarán:
- Registro e inicio de sesión
- Sistema de reseñas y calificaciones
- Dashboard de usuario

Los restaurantes de ejemplo se mostrarán normalmente.

## Instalación completa

Para usar todas las funcionalidades (autenticación, reseñas, etc.):

1. Clona el repositorio e instala dependencias (pasos 1-2 arriba)

2. Configura las variables de entorno:
```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus valores:
```
MONGODB_URI=mongodb://localhost:27017/cuamex
JWT_SECRET=tu-clave-secreta-super-segura-aqui
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre http://localhost:3000 en tu navegador

## Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en producción
- `npm run lint` - Verificar código con ESLint

## Estructura del proyecto

```
app/
  api/          # Rutas API (autenticación, reseñas)
  dashboard/    # Panel de usuario/admin
  login/        # Página de inicio de sesión
  register/     # Página de registro
components/     # Componentes reutilizables
lib/           # Utilidades (DB, autenticación)
public/        # Archivos estáticos
```

## Configuración de MongoDB

Asegúrate de tener MongoDB ejecutándose localmente o usa MongoDB Atlas para una base de datos en la nube.

## Despliegue

El proyecto puede desplegarse en Vercel, Netlify o cualquier plataforma que soporte Next.js.

Para despliegue en producción:
1. Configura las variables de entorno en tu plataforma
2. Asegúrate de que `JWT_SECRET` sea una clave fuerte
3. Configura `MONGODB_URI` con tu base de datos de producción
