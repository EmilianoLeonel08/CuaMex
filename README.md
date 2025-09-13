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

## Requisitos del sistema (Ubuntu)

Abre tu consola e instala las dependencias del sistema:

```bash
sudo apt update
sudo apt install nodejs npm git curl
```

## Vista rápida sin base de datos

Si solo quieres ver la interfaz web sin configurar la base de datos:

1. Clona el repositorio:
```bash
git clone https://github.com/EmilianoLeonel08/CuaMex.git
cd CuaMex
```

2. Instala las dependencias:
```bash
sudo apt install npm
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

## Instalación completa con MongoDB

Para usar todas las funcionalidades (autenticación, reseñas, etc.):

### 1. Instala MongoDB

```bash
# Importar clave pública de MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Añadir repositorio MongoDB
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar MongoDB
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Configura la aplicación

1. Clona el repositorio e instala dependencias (pasos 1-2 de vista rápida)

2. Configura las variables de entorno:
```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus valores:
```bash
nano .env.local
```

Contenido:
```
MONGODB_URI=mongodb://localhost:27017/cuamex
JWT_SECRET=tu-clave-secreta-super-segura-aqui
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre http://localhost:3000 en tu navegador


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
