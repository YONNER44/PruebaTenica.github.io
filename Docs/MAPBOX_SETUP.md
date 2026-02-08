# 🗺️ Configuración de Mapbox GL

## Obtener Token de Mapbox (GRATUITO)

### Opción 1: Registro Tradicional

1. **Ve a Mapbox**: https://account.mapbox.com/
2. **Regístrate gratis**:
   - Puedes usar tu correo electrónico
   - O registrarte con tu cuenta de GitHub (más rápido)
3. **Verifica tu email** (si usas correo)
4. **Accede al Dashboard**
5. **Copia tu token**:
   - En la página principal verás "Default public token"
   - Clic en "Copy token"
6. **Pega el token** en `.env.local`:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiTUlUT0tFTiIsImEiOiJjbGV4YW1wbGUifQ...
   ```
7. **Reinicia el servidor**:
   ```bash
   # Presiona Ctrl+C en la terminal
   npm run dev
   ```

### Opción 2: Token Temporal para Pruebas

Si solo quieres probar rápidamente, puedes usar este token de demostración público:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA
```

⚠️ **IMPORTANTE**: Este token es solo para pruebas rápidas. Para tu proyecto final, debes crear tu propio token.

## Plan Gratuito de Mapbox

✅ **50,000 cargas de mapa/mes** - Gratis
✅ **No requiere tarjeta de crédito** para desarrollo
✅ **Perfecto para pruebas técnicas** y proyectos personales

## Solución de Problemas

### El mapa no se muestra
- ✅ Verifica que copiaste el token completo (comienza con `pk.`)
- ✅ Revisa que el archivo `.env.local` esté en la raíz del proyecto
- ✅ Reinicia el servidor de desarrollo

### Error: "Unauthorized"
- Tu token puede ser inválido
- Genera un nuevo token en Mapbox
- Asegúrate de que sea un token "público" (public token)

## Recursos

- 📚 Documentación: https://docs.mapbox.com/
- 🎨 Estilos de mapa: https://docs.mapbox.com/api/maps/styles/
- 💬 Comunidad: https://github.com/mapbox/mapbox-gl-js/discussions
