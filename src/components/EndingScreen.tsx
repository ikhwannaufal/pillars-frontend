interface EndingScreenProps {
  istiqamah: number;
  dunya: number;
  onRestart: () => void;
}

function getEndingProfile(istiqamah: number, dunya: number): string {
  if (istiqamah >= 14 && dunya <= 6) return 'Anchored Professional';
  if (dunya >= 16 && istiqamah <= 5) return 'Drifting High Achiever';
  return 'Struggler Seeking Balance';
}

export function EndingScreen({ istiqamah, dunya, onRestart }: EndingScreenProps) {
  const profile = getEndingProfile(istiqamah, dunya);

  return (
    <div>
      <h2>Story Complete</h2>
      <p>
        <strong>Profile:</strong> {profile}
      </p>
      <p>
        <strong>Istiqamah:</strong> {istiqamah}
      </p>
      <p>
        <strong>Dunya:</strong> {dunya}
      </p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
