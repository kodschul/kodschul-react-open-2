### Einführung in CSS

CSS (Cascading Style Sheets) ist eine Stylesheet-Sprache, die verwendet wird, um das Aussehen und das Layout von HTML-Dokumenten zu definieren. Hier ist eine grundlegende Einführung in CSS:

#### Inline CSS:

Inline-CSS wird direkt innerhalb des HTML-Tags verwendet und wirkt sich nur auf dieses spezifische Element aus.

```html
<p style="color: blue; font-size: 16px;">Dieser Text ist blau und hat eine Schriftgröße von 16 Pixeln.</p>
```

Interne CSS:
Interne CSS wird innerhalb des <style>-Tags im <head>-Bereich des HTML-Dokuments definiert und wirkt sich auf alle Elemente innerhalb des Dokuments aus.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interne CSS</title>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <p>Dieser Text ist blau und hat eine Schriftgröße von 16 Pixeln.</p>
</body>
</html>

```

Externe CSS:
Externe CSS wird in einer separaten Datei mit der Erweiterung .css definiert und dann mit dem <link>-Tag im <head>-Bereich des HTML-Dokuments verknüpft.


```css
p {
    color: blue;
    font-size: 16px;
}
```

index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Externe CSS</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <p>Dieser Text ist blau und hat eine Schriftgröße von 16 Pixeln.</p>
</body>
</html>

```