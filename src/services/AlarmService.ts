import { scheduleNotification } from './NotificationService';
import { Jadwal, Tugas } from '../types';

export const calculateUrgency = (deadlineISO: string): 'merah' | 'kuning' | 'hijau' => {
  const now = new Date();
  const deadline = new Date(deadlineISO);
  const diffHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours < 24) return 'merah';
  if (diffHours < 72) return 'kuning';
  return 'hijau';
};

export const scheduleJadwalAlarm = (jadwal: Jadwal) => {
  const hariMap: Record<string, number> = { Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6, Minggu: 0 };
  const now = new Date();
  const targetDay = hariMap[jadwal.hari];
  let nextDate = new Date(now);
  const [jam, menit] = jadwal.jamMulai.split('.').map(Number);
  nextDate.setDate(now.getDate() + ((targetDay - now.getDay() + 7) % 7 || 7));
  nextDate.setHours(jam - 1, menit, 0, 0);
  if (nextDate.getTime() < now.getTime()) nextDate.setDate(nextDate.getDate() + 7);

  scheduleNotification(
    '⚠️ Jadwal Kuliah',
    `${jadwal.namaMatkul} di ${jadwal.ruangan} akan dimulai dalam 15 menit!`,
    nextDate.getTime(),
    `jadwal-${jadwal.id}`
  );
};

export const scheduleTugasAlarms = (tugas: Tugas) => {
  const deadline = new Date(tugas.deadline);
  scheduleNotification(
    '🔴 Deadline Tugas Mendesak!',
    `Tugas "${tugas.judul}" deadline hari ini!`,
    deadline.getTime() - 24 * 60 * 60 * 1000,
    `tugas-h1-${tugas.id}`
  );
  if (tugas.urgency !== 'merah') {
    scheduleNotification(
      '🟡 Pengingat Tugas',
      `Tugas "${tugas.judul}" deadline dalam 3 hari.`,
      deadline.getTime() - 3 * 24 * 60 * 60 * 1000,
      `tugas-h3-${tugas.id}`
    );
  }
};