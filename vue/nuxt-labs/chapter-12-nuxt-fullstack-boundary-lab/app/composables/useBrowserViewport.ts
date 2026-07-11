export interface BrowserViewport {
  readonly width: number;
  readonly height: number;
}

export function useBrowserViewport() {
  const viewport = ref<BrowserViewport | null>(null);

  function updateViewport(): void {
    viewport.value = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  onMounted(() => {
    updateViewport();
    window.addEventListener("resize", updateViewport);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateViewport);
  });

  return {
    viewport,
  };
}
