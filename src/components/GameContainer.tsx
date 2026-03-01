import { useState, useEffect } from 'react';
import { useGetStoryStart, useGetStoryNode } from '../api/endpoints';
import type { StoryNode, Choice } from '../types/story';
import { StoryView } from './StoryView';
import { ChoiceButtons } from './ChoiceButtons';
import { EndingScreen } from './EndingScreen';

export function GameContainer() {
  const [istiqamah, setIstiqamah] = useState(0);
  const [dunya, setDunya] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isEnding, setIsEnding] = useState(false);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);
  const [fetchNextEnabled, setFetchNextEnabled] = useState(false);

  // Fetch the starting node
  const {
    data: startData,
    isLoading: startLoading,
    isError: startError,
    refetch: refetchStart,
  } = useGetStoryStart();

  // Fetch subsequent nodes by ID (only when fetchNextEnabled is true)
  const {
    data: nextData,
    isLoading: nextLoading,
    isError: nextError,
  } = useGetStoryNode(nextId ?? 0, {
    query: {
      enabled: fetchNextEnabled && nextId !== null,
    },
  });

  // Set initial currentNode from start data
  useEffect(() => {
    if (startData?.status === 200 && startData.data != null) {
      setCurrentNode(startData.data as unknown as StoryNode);
    }
  }, [startData]);

  // Update currentNode when next node data arrives
  useEffect(() => {
    if (fetchNextEnabled && nextData?.status === 200 && nextData.data != null) {
      setCurrentNode(nextData.data as unknown as StoryNode);
      setFetchNextEnabled(false);
      setNextId(null);
    }
  }, [nextData, fetchNextEnabled]);

  function handleChoiceSelect(choice: Choice) {
    if (!currentNode) return;

    setIstiqamah((prev) => prev + choice.istiqamah);
    setDunya((prev) => prev + choice.dunya);
    setHistory((prev) => [...prev, currentNode.id]);

    if (choice.next_id === null) {
      setIsEnding(true);
    } else {
      setNextId(choice.next_id);
      setFetchNextEnabled(true);
    }
  }

  function handleRestart() {
    setIstiqamah(0);
    setDunya(0);
    setHistory([]);
    setIsEnding(false);
    setCurrentNode(null);
    setNextId(null);
    setFetchNextEnabled(false);
    refetchStart();
  }

  if (isEnding) {
    return (
      <EndingScreen
        istiqamah={istiqamah}
        dunya={dunya}
        onRestart={handleRestart}
      />
    );
  }

  if (startLoading || nextLoading) {
    return <p>Loading...</p>;
  }

  if (startError || nextError) {
    return <p>Error loading story. Please refresh.</p>;
  }

  if (!currentNode) {
    return <p>Loading story...</p>;
  }

  return (
    <div>
      <p>Step {history.length + 1}</p>
      <StoryView text={currentNode.text} />
      <ChoiceButtons choices={currentNode.choices} onSelect={handleChoiceSelect} />
    </div>
  );
}
