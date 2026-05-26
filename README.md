# 📅 SCHEDULY

> "Selamat Datang, Mahasiswa Ambisius"

Aplikasi pengingat jadwal kuliah & tugas untuk mahasiswa, dibangun dengan React Native + TypeScript.

## ✨ Fitur
- 🔐 Login dengan NIM + Password
- 📅 Jadwal kuliah per hari dengan horizontal scroll
- ✅ Manajemen tugas dengan urgency indicator (merah/kuning/hijau)
- 🔔 Notifikasi & alarm otomatis (H-15 menit kuliah, H-1 & H-3 deadline)
- 🌓 Dark mode eksklusif (#0D1117)
- 💾 Data tersimpan lokal dengan AsyncStorage

## 🚀 Quick Start

### Prasyarat
- Node.js v20.x LTS
- npm v10.x
- Android Studio + SDK 34
- Emulator Android (Pixel 7 recommended)

### Install & Run
```bash
# Clone repo
git clone https://github.com/username/scheduly.git
cd scheduly

# Install dependencies
npm install

# Start Metro bundler (terminal 1)
npx react-native start

# Build & install ke emulator (terminal 2)
npx react-native run-android