import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Jadwal, DayType } from '../types';

interface JadwalState {
  jadwal: Jadwal[];
  addJadwal: (jadwal: Omit<Jadwal, 'id'>) => void;
  removeJadwal: (id: string) => void;
  getJadwalByDay: (day: DayType) => Jadwal[];
}

export const useJadwalStore = create<JadwalState>()(
  persist(
    (set, get) => ({
      jadwal: [
        {
          id: '1', namaMatkul: 'Algoritma & Pemrograman', hari: 'Senin',
          jamMulai: '08.00', jamSelesai: '10.00', ruangan: 'R.201', dosen: 'Dr. Budi', sks: 3,
        },
        {
          id: '2', namaMatkul: 'Basis Data', hari: 'Rabu',
          jamMulai: '13.00', jamSelesai: '15.00', ruangan: 'Lab DB', dosen: 'Ibu Sari', sks: 3,
        },
      ],
      addJadwal: (item) => set((state) => ({ jadwal: [...state.jadwal, { ...item, id: Date.now().toString() }] })),
      removeJadwal: (id) => set((state) => ({ jadwal: state.jadwal.filter((j) => j.id !== id) })),
      getJadwalByDay: (day) => get().jadwal.filter((j) => j.hari === day),
    }),
    { name: 'jadwal-storage', storage: AsyncStorage }
  )
);