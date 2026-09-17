# בניית APK מהטלפון בלבד

1. פתח GitHub בדפדפן בטלפון וצור Repository חדש, למשל `sc-editor`.
2. העלה אליו את כל הקבצים והתיקיות של הפרויקט הזה (כולל `.github/workflows/build-apk.yml`).
3. היכנס ל־Actions ובחר **Build Android APK**.
4. לחץ **Run workflow**.
5. כשהבנייה מסתיימת בהצלחה, פתח את ה־workflow האחרון → Artifacts → `sc-editor-debug-apk`.
6. הורד את ה־ZIP של ה־Artifact וחלץ ממנו את `app-debug.apk`.
7. פתח את ה־APK בטלפון והתקן.

הערה: ה־workflow בונה APK Debug. אין צורך במחשב, אבל GitHub צריך לאפשר Actions ב־Repository.
