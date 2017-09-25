---
number: 6.10
title: Dependency Injection und der Injektor
part: Konzepte und Hintergründe
progress: 90
---

*Dependecy Injection* ist auch unter dem Namen *Inversion of control* bekannt. Bevor wir zeigen, welche Kontrolle dies umkehrt und welche Vorteile sich daraus ergeben, zeigen wir zuerst den klassischen Weg.

## Der klassische Weg

Klassisch kümmert sich eine Funktion selber um das instanziieren von weiteren Objekten. Gucken wir uns folgende Funktion an:

```javascript
function findUser(user){
  var db = new Database(...);
  db.find('users', user);
}
```

Die Funtkion `findUser` sucht einen Benutzer aus einer Datebank-Tabelle heraus. Dazu muss eine Verbindung zu einer Datenbank hergestellt werden. `findUser` kümmert sich selber darum, das ensprechende Objekt `Database` zu instanziieren. Die Kontrolle, Objekte zu erstellen liegt somit bei der Funktion selbst.


## Mit Dependecy Injection

Mit *Dependency Injection* wird die Kontrolle über das Instanziieren der Funktion entzogen. Die Kontrolle hat jetzt eine zentrale Stelle, die diese Arbeit erledigt. Diese zentrale Stelle nennen wir Injektor. Die Funktion muss nicht wissen, woher `db` kommt und wie `db` instanziiert wird. Wir könnten also Folgendes schreiben:

```javascript
function findUser(db){
  db.find('users', user);
}
```

## Der Injektor und die richtige Reihenfolge

Der Injektor kann nicht nur Instanzen erzeugen, sondern kümmert sich auch darum, diese in die richtige Reihenfolge zu setzen. Nehmen wir ein Beispiel mit untereinander abhängigen Services:

![AngularJS - Injektor](../images/figures/angularjs-injector.png)

Als Pseudo-JavaScript würden wir die Services folgendermaßen erzeugen:

```javascript
service 'S1', function(S2, S5, S6)
service 'S2', function(S3, S4, S5)
service 'S3', function(S6)
service 'S4', function(S3, S5)
service 'S5', function()
service 'S6', function()
```

Der Injektor von AngularJS löst den Baum von Abhängigkeiten korrekt auf und sorgt für die richtige Reihenfolge beim Instanziieren: `S6`, `S3`, `S5`, `S4`, `S2`, `S1`.

## Welche Vorteile bringt Dependency Injection?

* Der Code ist modularer und wiederverwendbar
* Der Code ist meistens wartbarer
* Der Code einfacher zu testen
* Das API ist simpler und abstrakter

## Der Injektor von AngularJS

Der Injektor von AngularJS erkennt die benutzten Services anhand der Parameternamen. Im Folgenden werden Database `DBUsername` und `DBPassword` übergeben. Der Injektor sucht dementsprechend nach Services mit den Namen `DBUsername` und `DBPassword`.

```javascript
app.value('DBUsername', 'root');
app.value('DBPassword', 'secret');
app.factory('Database', function(DBUsername, DBPassword) { ... });
```

Diese Konvention ist sinnvoll, um sich zusätzliche Konfigurationsdateien zu sparen. Alternativ müsste nämlich eine Mapping-Datei erstellt werden, die Funktionsnamen mit entsprechenden Abhängigkeiten enthält.

AngularJS benutzt *Dependency Injection* durchgehend.
