export interface LayerTheme {
  readonly accentColor: string;
  readonly surfaceColor: string;
}

export function useLayerTheme(): LayerTheme {
  return {
    accentColor: "#18794e",
    surfaceColor: "#ffffff",
  };
}
