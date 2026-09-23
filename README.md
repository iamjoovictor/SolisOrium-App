# Solis Orium

Interface web (React + Vite) para incentivar mobilidade elétrica e energia solar. Construída mobile-first, responsiva para uso em celular e desktop.

## Como rodar

1. Instale as dependências

   ```bash
   npm install
   ```

2. Configure a chave do Google Maps (usada na tela de Recarga)

   ```bash
   cp .env.example .env
   # edite .env e preencha VITE_GOOGLE_MAPS_API_KEY
   ```

3. Rode em desenvolvimento

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — servidor de desenvolvimento (Vite)
- `npm run build` — build de produção
- `npm run preview` — pré-visualiza o build de produção
- `npm run lint` — ESLint

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS (mobile-first)
- `@react-google-maps/api` para o mapa de pontos de recarga
- `react-icons` (conjunto Ionicons)
