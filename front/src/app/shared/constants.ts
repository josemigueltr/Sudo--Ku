import { environment } from "src/environments/environment"

export const API_BASE = environment.production 
  ? 'AQUI VA URL DE API EN PRODUCCION' 
  : 'http://localhost:5000'