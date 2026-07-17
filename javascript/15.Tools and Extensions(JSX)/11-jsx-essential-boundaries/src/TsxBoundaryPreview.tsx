// Goal:
// Verify the file boundary between JSX and TSX

type ProfileChipProps = {
  displayName: string;
  isOnline: boolean;
}

export function ProfileChip({ displayName, isOnline }: ProfileChipProps) {
  const normalizedName = displayName as string;

  return <span data-online={isOnline}>{normalizedName}</span>;
}