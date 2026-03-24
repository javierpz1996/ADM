import type { CanvasPath } from "react-sketch-canvas";

/**
 * Genera un PNG (data URL) dibujando los mismos trazos que react-sketch-canvas,
 * sin usar exportImage (que depende de un ref interno que a veces no está listo).
 */
export function renderPathsToPngDataUrl(
  paths: CanvasPath[],
  width: number,
  height: number
): string {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo crear el contexto 2D");
  }

  ctx.clearRect(0, 0, w, h);

  const drawPaths = paths.filter((p) => p.drawMode && p.paths.length > 0);

  for (const p of drawPaths) {
    const pts = p.paths;
    ctx.strokeStyle = p.strokeColor;
    ctx.lineWidth = p.strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (pts.length === 1) {
      const r = Math.max(1, p.strokeWidth / 2);
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.strokeColor;
      ctx.fill();
      continue;
    }

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  }

  return canvas.toDataURL("image/png");
}
