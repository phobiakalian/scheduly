import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useJadwalStore } from '../store/useJadwalStore';
import { useTugasStore } from '../store/useTugasStore';
import { COLORS } from '../theme/colors';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const jadwal = useJadwalStore((s) => s.jadwal);
  const tugas = useTugasStore((s) => s.getActiveTugas());
  const hariIni = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][new Date().getDay()] as any;
  const jadwalHariIni = jadwal.filter(j => j.hari === hariIni);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgMain} />
      <Text style={styles.header}>Halo, {user?.nama}! 👋</Text>
      <Text style={styles.subheader}>(NIM: {user?.nim})</Text>
      
      <Text style={styles.sectionTitle}>Jadwal Hari Ini</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollJadwal}>
        {jadwalHariIni.length === 0 ? (
          <Text style={styles.emptyText}>Tidak ada jadwal hari ini 🎉</Text>
        ) : (
          jadwalHariIni.map((j) => (
            <View key={j.id} style={styles.card}>
              <Text style={styles.time}>{j.jamMulai} - {j.jamSelesai}</Text>
              <Text style={styles.matkul}>{j.namaMatkul}</Text>
              <Text style={styles.ruangan}>📍 {j.ruangan}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <Text style={styles.sectionTitle}>Tugas Mendesak</Text>
      {tugas.map((t) => (
        <View key={t.id} style={[styles.taskItem, { borderLeftColor: t.urgency === 'merah' ? COLORS.urgent : t.urgency === 'kuning' ? COLORS.warning : COLORS.normal, borderLeftWidth: 4 }]}>
          <Text style={styles.taskTitle}>{t.judul}</Text>
          <Text style={styles.taskMeta}>Sisa {Math.ceil((new Date(t.deadline).getTime() - Date.now()) / (1000*60*60*24))} Hari</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgMain, padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', color: COLORS.textMain },
  subheader: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 12, marginTop: 8 },
  scrollJadwal: { paddingRight: 16, gap: 12 },
  card: { width: 200, padding: 16, backgroundColor: COLORS.bgCard, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  time: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
  matkul: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 6 },
  ruangan: { fontSize: 14, color: COLORS.textSecondary },
  taskItem: { padding: 12, backgroundColor: COLORS.bgCard, borderRadius: 8, marginBottom: 8 },
  taskTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  taskMeta: { fontSize: 13, color: COLORS.textSecondary },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 }
});