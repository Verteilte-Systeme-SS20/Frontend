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
 3. Bau das Docker-Image mit `docker build -t frontend:<Versionsnummer> .`
 4. Starte das Image mit `docker run -p <Gewünschter Port>:8080 frontend:<Versionsnummer>`

Cheatsheet für weitere docker-Kommandos (Anzeigen von laufenden Containern, Stopped von Containern etc.) siehe https://devhints.io/docker.