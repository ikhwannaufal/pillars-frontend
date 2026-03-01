import type { Choice } from '../types/story';

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export function ChoiceButtons({ choices, onSelect }: ChoiceButtonsProps) {
  return (
    <div>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onSelect(choice)}>
          {choice.label}
        </button>
      ))}
    </div>
  );
}
