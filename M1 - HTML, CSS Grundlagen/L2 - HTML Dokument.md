### Strukturierung von HTML-Dokumenten

Die Strukturierung von HTML-Dokumenten ist entscheidend für eine klare und gut organisierte Webentwicklung. Hier sind einige bewährte Praktiken und Beispiele, wie HTML-Dokumente strukturiert werden können:

#### Grundlegende Struktur eines HTML-Dokuments:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- Der Inhalt der Webseite kommt hier -->
</body>
</html>
```

Verwendung von <header>, <footer>, <nav> und <main>:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>
        <h1>Meine Website</h1>
        <nav>
            <ul>
                <li><a href="#">Startseite</a></li>
                <li><a href="#">Über uns</a></li>
                <li><a href="#">Kontakt</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Willkommen auf unserer Website</h2>
            <p>Hier kommt der Hauptinhalt der Webseite.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Meine Firma. Alle Rechte vorbehalten.</p>
    </footer>
</body>
</html>

```

Verwendung von <article>, <section>, <aside>:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>
        <h1>Artikel-Website</h1>
        <nav>
            <ul>
                <li><a href="#">Startseite</a></li>
                <li><a href="#">Artikel</a></li>
                <li><a href="#">Kontakt</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Artikel 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget justo nec lorem lacinia sodales.</p>
        </article>

        <aside>
            <h3>Verwandte Artikel</h3>
            <ul>
                <li><a href="#">Artikel 2</a></li>
                <li><a href="#">Artikel 3</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2024 Artikel-Website. Alle Rechte vorbehalten.</p>
    </footer>
</body>
</html>

```