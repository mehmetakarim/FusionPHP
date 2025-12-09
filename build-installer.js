const electronInstaller = require('electron-winstaller');
const path = require('path');

console.log('Creating windows installer...');

const rootPath = path.join('./');
const outPath = path.join(rootPath, 'release-builds');

const settings = {
    appDirectory: path.join(outPath, 'FusionPHP-win32-ia32/'),
    outputDirectory: path.join(outPath, 'windows-installer'),
    authors: 'Mehmet Akar',
    exe: 'FusionPHP.exe',
    description: 'PHP projelerinizi Electron ile masaüstü uygulamasına dönüştüren modern altyapı.',
    noMsi: true,
    setupExe: 'FusionPHPSetup.exe',
    setupIcon: path.join(rootPath, 'icons', 'logo.ico')
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});
