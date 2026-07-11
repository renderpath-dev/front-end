export interface PublicRuntimeConfigShape {
  readonly apiBase: string;
  readonly appTitle: string;
}

export interface ServerRuntimeConfigShape {
  readonly apiSecret: string;
  readonly public: PublicRuntimeConfigShape;
}
