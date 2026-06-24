import { create } from 'zustand';

interface QuizState {
  isOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isOpen: false,
  openQuiz: () => set({ isOpen: true }),
  closeQuiz: () => set({ isOpen: false }),
}));
