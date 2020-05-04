# Frontend

## Docker

Um das Frontend mit Docker zu starten
 1. Öffne eine Konsole (CMD oder Powershell) und navigiere in den Projektpfad (selber Ordner wie diese Datei) oder nutze einfach direkt das "Terminal"-Tab von IDEA 
 2. Bau das Projekt lokal mit Maven mit `mvn package` dies generiert eine `.jar` im `target`-Ordner
 3. Bau das Docker-Image mit `docker build -t frontend:<Versionsnummer> .`
 4. Starte das Image mit `docker run -p <Gewünschter Port>:8080 frontend:<Versionsnummer>`

Cheatsheet für weitere docker-Kommandos (Anzeigen von laufenden Containern, Stopped von Containern etc.) siehe https://devhints.io/docker.