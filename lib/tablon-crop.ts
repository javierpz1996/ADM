import type { CanvasPath } from "react-sketch-canvas";

function stripDataUrlPrefix(dataUrl: string): string {
  const m = /^data:image\/\w+;base64,(.+)$/i.exec(dataUrl.trim());
  return m ? m[1]! : dataUrl.trim();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    img.src = src;
  });
}

/**
 * Bounding box de los trazos (solo trazos de dibujo, no borrador).
 * Coordenadas en el mismo espacio que el PNG exportado del canvas.
 */
export function computeStrokeBoundingBox(
  paths: CanvasPath[],
  canvasWidth: number,
  canvasHeight: number,
  padding = 6
): { minX: number; minY: number; maxX: number; maxY: number } {
  const drawPaths = paths.filter((p) => p.drawMode && p.paths.length > 0);
  const usePaths = drawPaths.length > 0 ? drawPaths : paths.filter((p) => p.paths.length > 0);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const path of usePaths) {
    const hw = path.strokeWidth / 2;
    for (const pt of path.paths) {
      minX = Math.min(minX, pt.x - hw);
      minY = Math.min(minY, pt.y - hw);
      maxX = Math.max(maxX, pt.x + hw);
      maxY = Math.max(maxY, pt.y + hw);
    }
  }

  if (!Number.isFinite(minX)) {
    return {
      minX: 0,
      minY: 0,
      maxX: canvasWidth,
      maxY: canvasHeight,
    };
  }

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(canvasWidth, maxX + padding);
  maxY = Math.min(canvasHeight, maxY + padding);

  return { minX, minY, maxX, maxY };
}

/**
 * Recorta el PNG completo alrededor del trazo y devuelve base64 crudo + centro normalizado (0–1).
 */
export async function cropSignaturePng(
  fullPngDataUrl: string,
  paths: CanvasPath[],
  canvasWidth: number,
  canvasHeight: number
): Promise<{ rawBase64: string; positionX: number; positionY: number }> {
  const { minX, minY, maxX, maxY } = computeStrokeBoundingBox(
    paths,
    canvasWidth,
    canvasHeight
  );

  let w = Math.round(maxX - minX);
  let h = Math.round(maxY - minY);
  const minSize = 24;
  if (w < minSize || h < minSize) {
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    w = Math.max(minSize, w);
    h = Math.max(minSize, h);
    const halfW = w / 2;
    const halfH = h / 2;
    let nx = cx - halfW;
    let ny = cy - halfH;
    nx = Math.max(0, Math.min(nx, canvasWidth - w));
    ny = Math.max(0, Math.min(ny, canvasHeight - h));
    return finalizeCrop(fullPngDataUrl, nx, ny, w, h, canvasWidth, canvasHeight);
  }

  return finalizeCrop(fullPngDataUrl, minX, minY, w, h, canvasWidth, canvasHeight);
}

async function finalizeCrop(
  fullPngDataUrl: string,
  sx: number,
  sy: number,
  w: number,
  h: number,
  canvasWidth: number,
  canvasHeight: number
): Promise<{ rawBase64: string; positionX: number; positionY: number }> {
  const img = await loadImage(fullPngDataUrl);
  const oc = document.createElement("canvas");
  oc.width = w;
  oc.height = h;
  const ctx = oc.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D no disponible");
  }
  ctx.drawImage(img, sx, sy, w, h, 0, 0, w, h);
  const dataUrl = oc.toDataURL("image/png");
  const rawBase64 = stripDataUrlPrefix(dataUrl);

  const centerX = (sx + w / 2) / canvasWidth;
  const centerY = (sy + h / 2) / canvasHeight;

  return {
    rawBase64,
    positionX: Math.min(1, Math.max(0, centerX)),
    positionY: Math.min(1, Math.max(0, centerY)),
  };
}
