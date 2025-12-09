# FusionPHP 🚀

**PHP projelerinizi modern masaüstü uygulamalarına dönüştürün.**

FusionPHP, mevcut PHP (Laravel, CodeIgniter, Symfony vb.) projelerinizi veya saf PHP kodlarınızı, Electron gücüyle Windows, macOS ve Linux için yerel masaüstü uygulaması (Native Desktop App) haline getiren güçlü bir altyapıdır.

![FusionPHP](FusionPHP.jpg)

## 🌟 Özellikler

*   **Sıfır Konfigürasyon:** PHP sunucusu otomatik olarak arka planda başlatılır.
*   **Gizli Sunucu:** Kullanıcılarınız siyah terminal pencereleri görmez, tamamen profesyonel bir deneyim sunar.
*   **Kolay Entegrasyon:** Projenizi `framework` klasörüne atın ve çalıştırın.
*   **SQLite Desteği:** Veritabanı gerektiren projeler için taşınabilir ve hızlı çözüm.
*   **Otomatik Kurulum:** Tek tıkla kurulan `.exe` (Setup) dosyası oluşturma imkanı.
*   **Masaüstü Kısayolları:** Kurulum sonrası otomatik masaüstü ve başlat menüsü kısayolları.

## 📂 Proje Yapısı

```
FusionPHP/
├── framework/          # PHP projeniz BURAYA gelecek (index.php burada olmalı)
├── release-builds/     # Oluşturulan .exe ve Setup dosyaları buraya çıkar
├── icons/              # Uygulama ikonları
├── main.js             # Electron ana süreç dosyası
├── PhpServer.js        # Özel PHP sunucu başlatıcısı
└── build-installer.js  # Setup oluşturma betiği
```

## 🚀 Kurulum ve Kullanım

Bu projeyi bilgisayarınıza klonlayın ve bağımlılıkları yükleyin:

```bash
git clone https://github.com/mehmetakarim/FusionPHP.git
cd FusionPHP
npm install
```

### Geliştirme Modu (Test)

Uygulamayı canlı olarak test etmek için:

```bash
npm start
```

### Uygulamayı Derleme (Build) ve Dağıtım

FusionPHP ile uygulamanızı farklı platformlar için kolayca paketleyebilirsiniz.

#### 🪟 Windows

**1. Taşınabilir Sürüm (Portable .exe)**
Kurulum gerektirmeyen, klasör içinde çalışan sürüm. USB belleklerde taşımak için idealdir.
```bash
npm run package-win
```
*Çıktı:* `release-builds/FusionPHP-win32-ia32/`

**2. Kurulum Dosyası (Setup.exe)**
Profesyonel yükleyici. Otomatik olarak masaüstü kısayolu oluşturur ve Denetim Masası'na eklenir.
```bash
node build-installer.js
```
*Çıktı:* `release-builds/windows-installer/FusionPHPSetup.exe`

#### 🍎 macOS

**Taşınabilir Sürüm (.app)**
macOS için uygulama paketi oluşturur.
```bash
npm run package-mac
```
*Çıktı:* `release-builds/FusionPHP-darwin-x64/`
*(Not: .dmg oluşturmak için macOS üzerinde `electron-installer-dmg` gibi ek araçlar kullanmanız önerilir.)*

#### 🐧 Linux

**Taşınabilir Sürüm**
Linux dağıtımları için çalıştırılabilir dosya oluşturur.
```bash
npm run package-linux
```
*Çıktı:* `release-builds/FusionPHP-linux-x64/`

## 💡 İpuçları

*   **Veritabanı:** Projelerinizde MySQL yerine **SQLite** kullanmanız önerilir. Böylece kullanıcıların bilgisayarına MySQL kurmasına gerek kalmaz.
*   **PHP Sürümü:** Sistem, kullanıcının bilgisayarındaki yüklü PHP sürümünü (Environment Variables) kullanır.

## 👤 Yazar

**Mehmet Akar**
*   GitHub: [@mehmetakarim](https://github.com/mehmetakarim)


