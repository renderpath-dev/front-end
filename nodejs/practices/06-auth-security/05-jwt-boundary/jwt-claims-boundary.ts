export type JwtClaims = {
  sub: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  scope?: string;
};

export function isRequiredClaimsShape(claims: Partial<JwtClaims>): claims is JwtClaims {
  return typeof claims.sub === "string"
    && typeof claims.iss === "string"
    && typeof claims.aud === "string"
    && typeof claims.exp === "number"
    && typeof claims.iat === "number";
}
