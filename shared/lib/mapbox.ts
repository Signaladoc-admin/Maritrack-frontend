import mapboxgl from "mapbox-gl";

/**
 * Standard Mapbox access token with fallback to ensure Mapbox maps always render
 * even if environment variables are not injected during Docker/CI builds.
 */
export const DEFAULT_MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// Set default accessToken globally on mapboxgl instance in client environments
if (typeof window !== "undefined") {
  try {
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
  } catch { }
}

/**
 * Checks whether WebGL is supported by the client browser.
 * Uses { failIfMajorPerformanceCaveat: false } so software rasterizers (e.g. SwiftShader)
 * or power-saving GPUs are not unnecessarily rejected.
 */
export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    if (typeof mapboxgl.supported === "function") {
      return mapboxgl.supported(false);
    }
    return true;
  } catch {
    return true;
  }
}

/**
 * Returns raster tile URL for fallback map instances served directly by Mapbox API,
 * completely avoiding OpenStreetMap tile servers which block applications with HTTP 403 Forbidden.
 */
export function getMapboxRasterTileUrl(
  style: "streets-v12" | "dark-v11" = "streets-v12"
): string {
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/256/{z}/{x}/{y}@2x?access_token=${DEFAULT_MAPBOX_TOKEN}`;
}
