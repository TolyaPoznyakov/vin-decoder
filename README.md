# VIN Decoder

VIN Decoder — This is a React application that uses the **NHTSA VPIC API** to retrieve vehicle information by VIN and view a list of available variables.

## Demo

https://vin-decoder-inky.vercel.app/

## API

https://vpic.nhtsa.dot.gov/api/

## Features

- Decode vehicle information by VIN
- Browse all available vehicle variables
- Responsive interface
- Loading and error states
- Clean component-based architecture

## Technologies

- React
- TypeScript
- Vite
- React Router
- Axios
- ESLint

## Project Setup

Create a `.env` file in the project root:

```sh
VITE_API_URL=https://vpic.nhtsa.dot.gov/api
```


Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

