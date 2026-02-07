# Cloudless Monorepo

Monorepo con Next.js (frontend) y NestJS (backend) usando pnpm workspaces.

## Estructura

```
cloudless/
├── apps/
│   ├── web/          # Next.js 16 - Frontend (puerto 3001)
│   └── api/          # NestJS 11 - Backend (puerto 3000)
├── packages/
│   └── shared/       # Código compartido (@repo/shared)
└── package.json      # Root con scripts globales
```

## Requisitos

- Node.js 18+
- pnpm 8+
- docker

## Instalación

```bash
pnpm install
```

## Desarrollo

Correr ambas apps en paralelo:

```bash
pnpm dev
```

O individualmente:

```bash
# Frontend
pnpm --filter web dev

# Backend
pnpm --filter api dev
```

## Build

```bash
pnpm build
```

## Apps

| App | Tecnología | Puerto | Descripción                       |
|-----|------------|--------|-----------------------------------|
| web | Next.js 16 | 3001   | Frontend React con Tailwind CSS   |
| api | NestJS 11  | 3000   | Backend API REST                  |

## Paquetes Compartidos

- `@repo/shared`: Tipos, utilidades y código compartido entre apps

## Convenciones

- Usar el scope `@repo/` para paquetes internos
- Mantener versiones consistentes de TypeScript y ESLint
- Cada app maneja sus propias dependencias
- El root solo tiene scripts globales y devDependencies mínimas

## Scripts Útiles

```bash
# Lint en todas las apps
pnpm -r lint

# Test en todas las apps
pnpm -r test

# Agregar dependencia a una app específica
pnpm --filter web add axios

# Agregar dependencia compartida
pnpm --filter @repo/shared add zod
```

## Notas

- El frontend corre en `http://localhost:3001`
- El backend corre en `http://localhost:3000`
- Configura las variables de entorno en cada app según sea necesario
- Para correr correctamente el backend desde `/api` es necesario correr `docker compose up -d`