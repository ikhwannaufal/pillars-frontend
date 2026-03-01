import type { Choice } from '../types/story';

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export function ChoiceButtons({ choices, onSelect }: ChoiceButtonsProps) {
  return (
    <div>
      {choices.map((choice) => (
        <button key={choice.id} onClick={() => onSelect(choice)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
}
