### HTML-Tags und ihre Verwendung

HTML-Tags sind die grundlegenden Bausteine einer HTML-Datei und dienen dazu, den Browsern die Struktur und das Layout der Webseite mitzuteilen. Hier sind einige gängige HTML-Tags und ihre Verwendung:

#### `<html>`

Der `<html>`-Tag definiert den Anfang und das Ende eines HTML-Dokuments.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!-- Inhalt der Webseite -->
</body>
</html>
```

<head>
Der <head>-Tag enthält Metainformationen über das HTML-Dokument, wie z. B. den Titel der Seite, Verweise auf externe Ressourcen usw.

```html
<head>
    <meta charset="UTF-8">
    <title>Titel der Seite</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>

```

<body>
Der <body>-Tag enthält den sichtbaren Inhalt der Webseite, wie Text, Bilder, Links usw.

```html
<body>
    <h1>Überschrift</h1>
    <p>Ein Absatz mit Text.</p>
    <img src="bild.jpg" alt="Bildbeschreibung">
    <a href="https://www.beispiel.com">Ein Link</a>
</body>

```

<div>
Der <div>-Tag wird verwendet, um HTML-Elemente gruppiert zu definieren oder zu gruppieren, um sie mit CSS zu gestalten oder mit JavaScript zu manipulieren.

```html
<div id="container">
    <div class="box">Inhalt der Box 1</div>
    <div class="box">Inhalt der Box 2</div>
</div>

```

<span>
Der <span>-Tag wird verwendet, um Inline-Elemente zu gruppieren oder mit CSS zu gestalten.

```html
<p>Ein <span style="color: red;">roter</span> Text.</p>
```

<a>
Der <a>-Tag wird verwendet, um Links zu anderen Seiten oder Ressourcen zu erstellen.

```html
<a href="https://www.beispiel.com">Ein Link zu Beispiel.com</a>
```