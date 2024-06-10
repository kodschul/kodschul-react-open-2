### Einführung in JavaScript

JavaScript ist eine weit verbreitete Programmiersprache, die hauptsächlich für die Webentwicklung verwendet wird. Hier ist eine grundlegende Einführung in JavaScript:

#### Inline JavaScript:

Inline-JavaScript wird direkt innerhalb des HTML-Tags verwendet und wirkt sich nur auf dieses spezifische Element aus.

```html
<button onclick="alert('Hallo Welt!')">Klick mich</button>
```

Internes JavaScript:
Internes JavaScript wird innerhalb des <script>-Tags im <head>- oder <body>-Bereich des HTML-Dokuments definiert.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internes JavaScript</title>
    <script>
        function greet() {
            alert('Hallo Welt!');
        }
    </script>
</head>
<body>
    <button onclick="greet()">Klick mich</button>
</body>
</html>

```

Externes JavaScript:
Externes JavaScript wird in einer separaten Datei mit der Erweiterung .js definiert und dann mit dem <script>-Tag im <head>- oder <body>-Bereich des HTML-Dokuments verknüpft.

```javascript
function greet() {
    alert('Hallo Welt!');
}
```

index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Externes JavaScript</title>
    <script src="script.js"></script>
</head>
<body>
    <button onclick="greet()">Klick mich</button>
</body>
</html>

```