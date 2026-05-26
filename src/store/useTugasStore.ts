import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tugas } from '../types';

export const calculateUrgency = (deadlineISO: string): 'merah' | 'kuning' | 'hijau' => {
  const now = new Date();
  const deadline = new Date(deadlineISO);
  const diffHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours < 24) return 'merah';
  if (diffHours < 72) return 'kuning';
  return 'hijau';
};

interface TugasState {
  tugas: Tugas[];
  addTugas: (tugas: Omit<Tugas, 'id' | 'urgency'>) => void;
  toggleTugas: (id: string) => void;
  getActiveTugas: () => Tugas[];
  getDoneTugas: () => Tugas[];
}

export const useTugasStore = create<TugasState>()(
  persist(
    (set, get) => ({
      tugas: [
        {
          id: '1', judul: 'Tugas Besar Basis Data', deskripsi: 'ERD + SQL', matkul: 'Basis Data',
          deadline: '2024-06-20T00:00:00', time: '23:59', isDone: false, urgency: 'merah',
        },
      ],
      addTugas: (item) => {
        const urgency = calculateUrgency(item.deadline);
        set((state) => ({
          tugas: [...state.tugas, { ...item, id: Date.now().toString(), isDone: false, urgency }],
        }));
      },
      toggleTugas: (id) =>
        set((state) => ({
          tugas: state.tugas.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)),
        })),
      getActiveTugas: () => get().tugas.filter((t) => !t.isDone).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
      getDoneTugas: () => get().tugas.filter((t) => t.isDone),
    }),
    { name: 'tugas-storage', storage: AsyncStorage }
  )
);