# IP Manager (PWA)

## 1) المزامنة المباشرة (Firebase Realtime Database - مجاني)
1. console.firebase.google.com -> Add project
2. Build -> Realtime Database -> Create database (أي منطقة)
3. تبويب Rules -> الصق:
   { "rules": { "teams": { "$team": { ".read": true, ".write": true } } } }
   ثم Publish
4. انسخ رابط الداتا بيز (https://xxxx-default-rtdb.firebaseio.com)
5. افتح التطبيق -> الإعدادات -> الصق الرابط + اكتب نفس "كود الفريق" عند الكل

## 2) الرفع على GitHub Pages
1. ارفع كل الملفات في ريبو (root)
2. Settings -> Pages -> Branch: main / root -> Save
3. افتح الرابط من الموبايل -> Add to Home Screen / Install
