export function useSafeNow() {
  const label = useState<string>("safe-now-label", () => "Waiting for hydration");

  function updateNow(): void {
    label.value = new Date().toISOString();
  }

  onMounted(updateNow);

  return {
    label,
    updateNow,
  };
}
