/**
 * Shared camera-path mapping. The persistent canvas camera descends through the
 * scene as the page scrolls; this maps overall scroll progress (0→1) to a world
 * Y. Kept in one place so the camera rig and the scene-anchor measurement agree
 * on exactly where the camera is looking at any scroll position.
 */
export const CAM_Y_TOP = 1; // world Y at the top of the page
export const CAM_Y_SPAN = 10.5; // total descent over the full scroll

export const cameraYForProgress = (p: number) => CAM_Y_TOP - p * CAM_Y_SPAN;
