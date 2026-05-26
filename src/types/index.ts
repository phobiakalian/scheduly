export type DayType = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';

export interface Jadwal {
  id: string;
  namaMatkul: string;
  hari: DayType;
  jamMulai: string;
  jamSelesai: string;
  ruangan: string;
  dosen: string;
  sks: number;
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi: string;
  matkul: string;
  deadline: string;
  time: string;
  isDone: boolean;
  urgency: 'merah' | 'kuning' | 'hijau';
}

export interface User {
  nim: string;
  nama: string;
  jurusan: string;
}