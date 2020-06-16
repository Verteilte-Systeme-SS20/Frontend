# Frontend

Das Frontend besteht aus einem Spring-Server, der eine React-App ausliefert.
Der Spring-Code liegt unter `src/main/java`, der vermutlich komplexere React-Code unter `src/main/js`.

## Lokal starten

Um das Frontend normal lokal zu starten, nutze entweder die "Start"-Funktion von IDEA oder `mvn spring-boot:start` in der Konsole.

## React + Webpack

React ist ein Framework um moderne und dynamische Webseiten einfacher zu schreiben.

Die `app.js` ist hierbei der Entrypoint (equivalent zur `static void main`).

Beim Starten der App wird automatisch der React-JavaScript-Code von Babel in Browser-verständlichen ES5-JavaScript-Code übersetzt und anschließend von Webpack "kompiliert" in `src/main/resources/static/built/bundle.js`.

Diese `bundle.js` wird in der `index.html` unter `src/main/resources/templates` eingebunden.

Um die React-App bei Code-Änderungen zu aktualisieren, während der Spring-Server läuft, öffne ein Terminal und starte `target\node\yarn\dist\bin\yarn watch`.

## Docker

Um das Frontend mit Docker zu starten
 1. Öffne eine Konsole (CMD oder Powershell) und navigiere in den Projektpfad (selber Ordner wie diese Datei) oder nutze einfach direkt das "Terminal"-Tab von IDEA 
 2. Bau das Projekt lokal mit Maven mit `mvn package` dies generiert eine `.jar` im `target`-Ordner
 3. Starte das Spring-Image mit `docker-compose up`, da beide noch nicht vorhanden sind, sollten sie automatisch gebaut werden.
 4. (optional) Stoppe beide Container mit `STRG + C` in selben Terminal oder `docker-compose down` in einem beliebigen Terminal im selben Pfad.

Falls du Code verändert hast und die Containerlandschaft neu starten möchtest mit den Änderungen
 1. Öffne eine Konsole (CMD oder Powershell) und navigiere in den Projektpfad (selber Ordner wie diese Datei) oder nutze einfach direkt das "Terminal"-Tab von IDEA 
 2. Bau das Projekt erneut lokal mit Maven mit `mvn package`
 3. Baue das Spring-Image erneut mit der neuen `.jar` und starte es und das PostgreSQL-Image mit `docker-compose up --build frontend`

Cheatsheet für weitere docker-Kommandos (Anzeigen von laufenden Containern, Stoppen von Containern etc.) siehe https://devhints.io/docker.

Und für docker-compose: https://devhints.io/docker-compose.