import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    if (login(nim, password)) {
      navigation.replace('MainTabs' as never);
    } else {
      Alert.alert('Gagal', 'NIM atau Password salah. Password minimal 4 karakter.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgMain} />
      <Text style={styles.logo}>SCHEDULY</Text>
      <Text style={styles.title}>Selamat Datang, Mahasiswa Ambisius</Text>
      <Text style={styles.subtitle}>Masuk menggunakan akun portal kampus</Text>
      <TextInput style={styles.input} placeholder="NIM" placeholderTextColor={COLORS.textSecondary} value={nim} onChangeText={setNim} keyboardType="numeric" />
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={COLORS.textSecondary} value={password} onChangeText={setPassword} secureTextEntry={!showPass} />
        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeIcon}>
          <Text style={{ color: COLORS.textSecondary }}>{showPass ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgMain, padding: 24, justifyContent: 'center' },
  logo: { fontSize: 48, fontWeight: 'bold', color: COLORS.accent, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 22, color: COLORS.textMain, textAlign: 'center', marginBottom: 4, fontWeight: '600' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: COLORS.bgInput, color: COLORS.textMain, borderRadius: 8, padding: 14, fontSize: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  eyeIcon: { position: 'absolute', right: 14, top: 18, padding: 4 },
  btnLogin: { backgroundColor: COLORS.accent, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: COLORS.bgMain, fontWeight: 'bold', fontSize: 16 },
});