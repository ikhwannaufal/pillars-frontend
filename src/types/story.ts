export interface Choice {
  id: string;
  text: string;
  istiqamah: number;
  dunya: number;
  next_id: number | null;
}

export interface StoryNode {
  id: number;
  text: string;
  choices: Choice[];
}
