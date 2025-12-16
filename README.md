# 🌤️ Weather API Proxy

[English](#english) | [Español](#español)

---

<a name="english"></a>

## 🇬🇧 English

### 📖 Description

Weather API Proxy is a high-performance NestJS backend application that acts as an intelligent intermediary between clients and weather data providers. It implements multi-layer caching, rate limiting, and data validation to optimize API consumption, reduce costs, and improve response times.

### 🎯 Problem it Solves

- **Cost Reduction**: Minimizes external API calls through intelligent multi-layer caching (in-memory + Redis)
- **Performance Optimization**: Dramatically improves response times by serving cached data
- **Rate Limiting Protection**: Protects against API abuse with configurable throttling (3 req/sec, 20 req/10sec, 100 req/min)
- **Data Validation**: Ensures query parameters meet required format standards (yyyy-mm-dd dates)
- **Scalability**: Redis-based distributed cache enables horizontal scaling across multiple instances
- **Reliability**: Reduces dependency on external API availability by serving cached responses

### 🛠️ Technologies Used

#### Backend Framework

- **NestJS** - Progressive Node.js framework for building efficient and scalable server-side applications
- **TypeScript** - Strongly typed superset of JavaScript
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework (underlying NestJS)

#### Caching & Performance

- **Cache Manager** v7 - Multi-store caching library
- **Keyv** - Simple key-value storage with multi-adapter support
- **@keyv/redis** - Redis adapter for Keyv
- **CacheableMemory** - In-memory caching with LRU (Least Recently Used) eviction
- **Redis** - Distributed in-memory data store (external dependency)

#### Validation & Security

- **Class Validator** - Decorator-based validation library
- **Class Transformer** - Object transformation library
- **@nestjs/throttler** - Rate limiting and throttling protection

#### Development Tools

- **Jest** - Testing framework
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **dotenv** - Environment variable management

### 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Redis** (v6 or higher) - Running locally or remotely
- **npm** or **yarn**
- **Weather API Key** - From your weather data provider

### ⚙️ Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Boris-Espinosa/Weather-Api-Nest.git
cd Weather-Api-Nest
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# Weather API Configuration
API_KEY=your_weather_api_key
API_URL=https://api.weatherprovider.com/v1

# Redis Configuration (if not using localhost:6379)
REDIS_HOST=localhost
REDIS_PORT=6379

# Application Configuration
PORT=3000
NODE_ENV=development
```

#### 4. Start Redis

**Using Docker:**

```bash
docker run -d -p 6379:6379 redis:alpine
```

**Using local Redis:**

```bash
redis-server
```

#### 5. Run the application

**Development mode:**

```bash
npm run start:dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

### 🚀 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in watch mode (development)
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and fix code with ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

### 📡 API Endpoints

#### Get Weather Data

```
GET /cache/:cityName
```

Retrieves weather data for a specified city with optional date range filtering.

**URL Parameters:**

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| cityName  | string | Yes      | Name of the city |

**Query Parameters:**

| Parameter | Type   | Required | Format     | Description |
| --------- | ------ | -------- | ---------- | ----------- |
| date1     | string | No       | yyyy-mm-dd | Start date  |
| date2     | string | No       | yyyy-mm-dd | End date    |

**Examples:**

```bash
# Get current weather for London
GET http://localhost:3000/cache/London

# Get weather for a specific date
GET http://localhost:3000/cache/London?date1=2025-12-01

# Get weather for a date range
GET http://localhost:3000/cache/London?date1=2025-12-01&date2=2025-12-15
```

**Success Response (200 OK):**

```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11
  },
  "current": {
    "temp_c": 15.0,
    "temp_f": 59.0,
    "condition": {
      "text": "Partly cloudy"
    },
    "humidity": 72,
    "wind_kph": 15.1
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Invalid date format
{
  "statusCode": 400,
  "message": ["date1 must be in format yyyy-mm-dd"],
  "error": "Bad Request"
}

// 429 Too Many Requests - Rate limit exceeded
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

### 🗂️ Project Structure

```
weather-api/
├── src/
│   ├── app.controller.ts        # Main controller with weather endpoint
│   ├── app.service.ts           # Service with business logic
│   ├── app.module.ts            # Root module with cache & throttler config
│   ├── main.ts                  # Application entry point
│   └── dto/
│       └── date.dto.ts          # Data Transfer Object for validation
├── test/
│   ├── app.e2e-spec.ts         # End-to-end tests
│   └── jest-e2e.json           # E2E test configuration
├── nest-cli.json               # NestJS CLI configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.build.json         # TypeScript build configuration
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Dependencies and scripts
└── .env                        # Environment variables (not committed)
```

### 🔧 Features

**Caching Strategy:**

- ✅ Multi-layer caching (Memory → Redis)
- ✅ In-memory cache with LRU eviction (5000 items, 60s TTL)
- ✅ Redis distributed cache for persistence and sharing
- ✅ Automatic cache key generation based on request parameters
- ✅ Transparent cache interceptor integration

**Rate Limiting:**

- ✅ Three-tier throttling system
  - Short: 3 requests per second
  - Medium: 20 requests per 10 seconds
  - Long: 100 requests per minute
- ✅ Automatic 429 responses when limits exceeded
- ✅ Per-IP tracking

**Data Validation:**

- ✅ Date format validation (yyyy-mm-dd) using regex
- ✅ Optional query parameters
- ✅ Clear error messages with field-specific feedback
- ✅ Type-safe DTOs with class-validator decorators

**Error Handling:**

- ✅ HTTP exception propagation from external API
- ✅ Structured error responses
- ✅ Proper status code mapping

### 🏗️ Architecture Patterns

**NestJS Best Practices:**

- **Modular Architecture**: Clear separation of concerns with modules, controllers, and services
- **Dependency Injection**: Leverages NestJS DI for loose coupling
- **Interceptors**: Uses CacheInterceptor for transparent caching
- **Guards**: ThrottlerGuard for automatic rate limiting
- **DTOs**: Type-safe data transfer objects with validation decorators
- **Pipes**: ValidationPipe for automatic request validation

**Caching Strategy:**

- **Multi-Store Pattern**: Prioritizes fast in-memory cache before hitting Redis
- **TTL-based Expiration**: 60-second cache lifetime balances freshness and performance
- **LRU Eviction**: Memory cache uses Least Recently Used strategy to maintain performance
- **Distributed Cache**: Redis enables cache sharing across multiple application instances

**Performance Optimizations:**

- **Lazy Evaluation**: Only fetches external API when cache misses
- **Connection Pooling**: Redis connection reuse
- **Async Operations**: Non-blocking I/O for all network operations

### 📊 Caching Configuration

#### Memory Cache Layer

```typescript
new Keyv({
  store: new CacheableMemory({
    ttl: 60000, // 60 seconds
    lruSize: 5000, // Maximum 5000 cached items
  }),
});
```

#### Redis Cache Layer

```typescript
new KeyvRedis('redis://localhost:6379');
```

**Cache Hit Flow:**

1. Request arrives → Check Memory Cache
2. If Memory Hit → Return immediately
3. If Memory Miss → Check Redis
4. If Redis Hit → Store in Memory + Return
5. If Redis Miss → Call External API
6. Store in Redis + Memory → Return

### 🔒 Rate Limiting Configuration

```typescript
throttlers: [
  {
    name: 'short',
    ttl: 1000, // 1 second window
    limit: 3, // 3 requests max
  },
  {
    name: 'medium',
    ttl: 10000, // 10 second window
    limit: 20, // 20 requests max
  },
  {
    name: 'long',
    ttl: 60000, // 60 second window
    limit: 100, // 100 requests max
  },
];
```

### 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### 🚢 Deployment

**Docker Deployment:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Docker Compose with Redis:**

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - REDIS_HOST=redis
      - API_KEY=${API_KEY}
      - API_URL=${API_URL}
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - '6379:6379'
```

**Cloud Deployment Options:**

- **Heroku**: Simple deployment with Redis Cloud addon
- **AWS**: ECS/EKS with ElastiCache Redis
- **Azure**: App Service with Azure Cache for Redis
- **Google Cloud**: Cloud Run with Memorystore

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

UNLICENSED

### 👤 Author

**Boris Espinosa**

- GitHub: [@Boris-Espinosa](https://github.com/Boris-Espinosa)

---

<a name="español"></a>

## 🇪🇸 Español

### 📖 Descripción

Weather API Proxy es una aplicación backend de alto rendimiento construida con NestJS que actúa como intermediario inteligente entre clientes y proveedores de datos meteorológicos. Implementa caché multinivel, limitación de tasa y validación de datos para optimizar el consumo de API, reducir costos y mejorar los tiempos de respuesta.

### 🎯 Problema que Resuelve

- **Reducción de Costos**: Minimiza llamadas a API externa mediante caché multinivel inteligente (memoria + Redis)
- **Optimización de Rendimiento**: Mejora dramáticamente los tiempos de respuesta sirviendo datos en caché
- **Protección por Rate Limiting**: Protege contra abuso de API con throttling configurable (3 req/seg, 20 req/10seg, 100 req/min)
- **Validación de Datos**: Asegura que los parámetros cumplan con estándares de formato requeridos (fechas yyyy-mm-dd)
- **Escalabilidad**: Caché distribuido basado en Redis permite escalado horizontal entre múltiples instancias
- **Confiabilidad**: Reduce dependencia en disponibilidad de API externa sirviendo respuestas en caché

### 🛠️ Tecnologías Utilizadas

#### Framework Backend

- **NestJS** - Framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables
- **TypeScript** - Superset de JavaScript con tipado fuerte
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework de aplicaciones web (subyacente a NestJS)

#### Caché y Rendimiento

- **Cache Manager** v7 - Biblioteca de caché multi-almacén
- **Keyv** - Almacenamiento simple de clave-valor con soporte multi-adaptador
- **@keyv/redis** - Adaptador Redis para Keyv
- **CacheableMemory** - Caché en memoria con desalojo LRU (Least Recently Used)
- **Redis** - Almacén de datos en memoria distribuido (dependencia externa)

#### Validación y Seguridad

- **Class Validator** - Biblioteca de validación basada en decoradores
- **Class Transformer** - Biblioteca de transformación de objetos
- **@nestjs/throttler** - Protección de limitación de tasa y throttling

#### Herramientas de Desarrollo

- **Jest** - Framework de testing
- **ESLint** - Linting y calidad de código
- **Prettier** - Formateo de código
- **dotenv** - Gestión de variables de entorno

### 📋 Prerequisitos

- **Node.js** (v18 o superior)
- **Redis** (v6 o superior) - Ejecutándose localmente o remotamente
- **npm** o **yarn**
- **Weather API Key** - De tu proveedor de datos meteorológicos

### ⚙️ Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Boris-Espinosa/Weather-Api-Nest.git
cd Weather-Api-Nest
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Crea un archivo `.env` en el directorio raíz:

```env
# Configuración de Weather API
API_KEY=tu_weather_api_key
API_URL=https://api.weatherprovider.com/v1

# Configuración de Redis (si no usas localhost:6379)
REDIS_HOST=localhost
REDIS_PORT=6379

# Configuración de la Aplicación
PORT=3000
NODE_ENV=development
```

#### 4. Iniciar Redis

**Usando Docker:**

```bash
docker run -d -p 6379:6379 redis:alpine
```

**Usando Redis local:**

```bash
redis-server
```

#### 5. Ejecutar la aplicación

**Modo desarrollo:**

```bash
npm run start:dev
```

**Modo producción:**

```bash
npm run build
npm run start:prod
```

La API estará disponible en `http://localhost:3000`

### 🚀 Scripts Disponibles

- `npm run start` - Inicia la aplicación
- `npm run start:dev` - Inicia en modo watch (desarrollo)
- `npm run start:debug` - Inicia en modo debug
- `npm run start:prod` - Inicia build de producción
- `npm run build` - Construye la aplicación
- `npm run format` - Formatea código con Prettier
- `npm run lint` - Lint y corrige código con ESLint
- `npm run test` - Ejecuta tests unitarios
- `npm run test:watch` - Ejecuta tests en modo watch
- `npm run test:cov` - Ejecuta tests con cobertura
- `npm run test:e2e` - Ejecuta tests end-to-end

### 📡 Endpoints de la API

#### Obtener Datos Meteorológicos

```
GET /cache/:cityName
```

Obtiene datos meteorológicos para una ciudad especificada con filtrado opcional por rango de fechas.

**Parámetros de URL:**

| Parámetro | Tipo   | Requerido | Descripción         |
| --------- | ------ | --------- | ------------------- |
| cityName  | string | Sí        | Nombre de la ciudad |

**Parámetros de Query:**

| Parámetro | Tipo   | Requerido | Formato    | Descripción     |
| --------- | ------ | --------- | ---------- | --------------- |
| date1     | string | No        | yyyy-mm-dd | Fecha de inicio |
| date2     | string | No        | yyyy-mm-dd | Fecha de fin    |

**Ejemplos:**

```bash
# Obtener clima actual para Londres
GET http://localhost:3000/cache/London

# Obtener clima para una fecha específica
GET http://localhost:3000/cache/London?date1=2025-12-01

# Obtener clima para un rango de fechas
GET http://localhost:3000/cache/London?date1=2025-12-01&date2=2025-12-15
```

**Respuesta Exitosa (200 OK):**

```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11
  },
  "current": {
    "temp_c": 15.0,
    "temp_f": 59.0,
    "condition": {
      "text": "Partly cloudy"
    },
    "humidity": 72,
    "wind_kph": 15.1
  }
}
```

**Respuestas de Error:**

```json
// 400 Bad Request - Formato de fecha inválido
{
  "statusCode": 400,
  "message": ["date1 must be in format yyyy-mm-dd"],
  "error": "Bad Request"
}

// 429 Too Many Requests - Límite de tasa excedido
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

### 🗂️ Estructura del Proyecto

```
weather-api/
├── src/
│   ├── app.controller.ts        # Controlador principal con endpoint de clima
│   ├── app.service.ts           # Servicio con lógica de negocio
│   ├── app.module.ts            # Módulo raíz con config de cache y throttler
│   ├── main.ts                  # Punto de entrada de la aplicación
│   └── dto/
│       └── date.dto.ts          # Objeto de Transferencia de Datos para validación
├── test/
│   ├── app.e2e-spec.ts         # Tests end-to-end
│   └── jest-e2e.json           # Configuración de tests E2E
├── nest-cli.json               # Configuración de NestJS CLI
├── tsconfig.json               # Configuración de TypeScript
├── tsconfig.build.json         # Configuración de build TypeScript
├── eslint.config.mjs           # Configuración de ESLint
├── package.json                # Dependencias y scripts
└── .env                        # Variables de entorno (no commiteado)
```

### 🔧 Características

**Estrategia de Caché:**

- ✅ Caché multinivel (Memoria → Redis)
- ✅ Caché en memoria con desalojo LRU (5000 items, TTL 60s)
- ✅ Caché distribuido Redis para persistencia y compartición
- ✅ Generación automática de claves de caché basada en parámetros de request
- ✅ Integración transparente de interceptor de caché

**Limitación de Tasa:**

- ✅ Sistema de throttling de tres niveles
  - Corto: 3 requests por segundo
  - Medio: 20 requests por 10 segundos
  - Largo: 100 requests por minuto
- ✅ Respuestas 429 automáticas cuando se exceden límites
- ✅ Seguimiento por IP

**Validación de Datos:**

- ✅ Validación de formato de fecha (yyyy-mm-dd) usando regex
- ✅ Parámetros de query opcionales
- ✅ Mensajes de error claros con feedback específico por campo
- ✅ DTOs type-safe con decoradores de class-validator

**Manejo de Errores:**

- ✅ Propagación de excepciones HTTP desde API externa
- ✅ Respuestas de error estructuradas
- ✅ Mapeo apropiado de códigos de estado

### 🏗️ Patrones de Arquitectura

**Mejores Prácticas de NestJS:**

- **Arquitectura Modular**: Clara separación de responsabilidades con módulos, controladores y servicios
- **Inyección de Dependencias**: Aprovecha DI de NestJS para bajo acoplamiento
- **Interceptores**: Usa CacheInterceptor para caché transparente
- **Guards**: ThrottlerGuard para limitación automática de tasa
- **DTOs**: Objetos de transferencia de datos type-safe con decoradores de validación
- **Pipes**: ValidationPipe para validación automática de requests

**Estrategia de Caché:**

- **Patrón Multi-Store**: Prioriza caché en memoria rápida antes de acceder a Redis
- **Expiración Basada en TTL**: Tiempo de vida de caché de 60 segundos balancea frescura y rendimiento
- **Desalojo LRU**: Caché en memoria usa estrategia Least Recently Used para mantener rendimiento
- **Caché Distribuido**: Redis permite compartir caché entre múltiples instancias de la aplicación

**Optimizaciones de Rendimiento:**

- **Evaluación Perezosa**: Solo obtiene API externa cuando hay fallo de caché
- **Connection Pooling**: Reutilización de conexión Redis
- **Operaciones Asíncronas**: I/O no bloqueante para todas las operaciones de red

### 📊 Configuración de Caché

#### Capa de Caché en Memoria

```typescript
new Keyv({
  store: new CacheableMemory({
    ttl: 60000, // 60 segundos
    lruSize: 5000, // Máximo 5000 items en caché
  }),
});
```

#### Capa de Caché Redis

```typescript
new KeyvRedis('redis://localhost:6379');
```

**Flujo de Cache Hit:**

1. Llega request → Verifica Caché en Memoria
2. Si Hit en Memoria → Retorna inmediatamente
3. Si Miss en Memoria → Verifica Redis
4. Si Hit en Redis → Almacena en Memoria + Retorna
5. Si Miss en Redis → Llama API Externa
6. Almacena en Redis + Memoria → Retorna

### 🔒 Configuración de Rate Limiting

```typescript
throttlers: [
  {
    name: 'short',
    ttl: 1000, // Ventana de 1 segundo
    limit: 3, // Máximo 3 requests
  },
  {
    name: 'medium',
    ttl: 10000, // Ventana de 10 segundos
    limit: 20, // Máximo 20 requests
  },
  {
    name: 'long',
    ttl: 60000, // Ventana de 60 segundos
    limit: 100, // Máximo 100 requests
  },
];
```

### 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Cobertura de tests
npm run test:cov

# Modo watch
npm run test:watch
```

### 🚢 Deployment

**Deployment con Docker:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Docker Compose con Redis:**

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - REDIS_HOST=redis
      - API_KEY=${API_KEY}
      - API_URL=${API_URL}
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - '6379:6379'
```

**Opciones de Deployment en la Nube:**

- **Heroku**: Deployment simple con addon Redis Cloud
- **AWS**: ECS/EKS con ElastiCache Redis
- **Azure**: App Service con Azure Cache for Redis
- **Google Cloud**: Cloud Run con Memorystore

### 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

1. Haz fork del repositorio
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Commit tus cambios (`git commit -m 'Agrega alguna CaracteristicaIncreible'`)
4. Push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

### 📄 Licencia

UNLICENSED

### 👤 Autor

**Boris Espinosa**

- GitHub: [@Boris-Espinosa](https://github.com/Boris-Espinosa)
