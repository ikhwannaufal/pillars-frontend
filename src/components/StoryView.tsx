interface StoryViewProps {
  text: string;
}

export function StoryView({ text }: StoryViewProps) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
