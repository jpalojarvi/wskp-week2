2. 
Tyontekija:
Tyontekijanumero, Sukunimi, Etunimi, Osastonumero, Lahiosoite, Postinumero, Puhelinnumero, Paikka

Puhelu: 
PuheluID, Puhelinnumero, Hinta

Postitus:
Postinumero, Postitoimipaikka

Osasto:
Osastonumero, Nimi

Auto:
Rekisteritunnus, Merkki, Haltija

3.
Tyontekija:
PK Tyontekijanumero, FK Osastonumero, FK postinumero

Puhelu:
PK PuheluID

Postitus: 
PK Postinumero

Osasto:
PK Osastonumero

Auto:
PK Rekisterinumero, FK Haltija

SELECT * FROM tyontekija WHERE Tyontekijanumero = 73;
Duration for 1 query: 0,000 sec.

SELECT * FROM puhelu WHERE PuheluID = '73';
Duration for 1 query: 0,000 sec.


4.
Kysely 1: 
SELECT etunimi, palkka
FROM tyontekija
WHERE sukunimi = 'Hämes';
Duration for 1 query: 0,047 sec.

Kysely 2:
SELECT SUM(hinta)
FROM puhelu
WHERE Puhelinnumero = '041-951114';
Duration for 1 query: 1,485 sec. 

Kysely 3: 
SELECT PuheluID, Hinta 
FROM puhelu
INNER JOIN tyontekija
ON tyontekija.Puhelinnumero = puhelu.Puhelinnumero
WHERE Sukunimi = 'Hämes';
Duration for 1 query: 8,063 sec. (+ 35,531 sec. network)

Hitaat vasteajat johtuvat siitä, että tietokanta on valtava, eikä tietokantaa ole indeksoitu binäärihakua varten, jolloin joudutaan käyttämään lineaarista hakua.

5.
CREATE INDEX idx_sukunimi
ON tyontekija(Sukunimi);

Hakuaika kyselylle #1 indeksoinnin jälkeen: Duration for 1 query: 0,000 sec.

6. 
CREATE INDEX idx_puhelinnumero
ON puhelu.Puhelinnumero;

Hakuaika kyselylle #2 indeksoinnin jälkeen: Duration for 1 query: 0,015 sec.

7. 
CREATE INDEX idx_puhelinnumero
ON puhelu.Puhelinnumero;

CREATE INDEX idx_sukunimi
ON tyontekija(Sukunimi);

Hakuaika kyselylle #3 indeksoinnin jälkeen: Duration for 1 query: 0,015 sec.

8.
simulaatio.sql:
USE isofirma;
SELECT etunimi, palkka FROM tyontekija WHERE sukunimi = 'Hämes';
SELECT etunimi, palkka FROM tyontekija WHERE sukunimi = 'Marttinen';
SELECT etunimi, palkka FROM tyontekija WHERE sukunimi = 'Kasari';
SELECT etunimi, palkka FROM tyontekija WHERE sukunimi = 'Kivisaari';
SELECT etunimi, palkka FROM tyontekija WHERE sukunimi = 'Wuolab';

INDEKSOINNIN KANSSA: 
mysqlslap --user=root --password=database123 --concurrency=5 --iterations=10
--create-schema=isoyritys --query=kyselyt.sql

Benchmark
        Average number of seconds to run all queries: 0.004 seconds
        Minimum number of seconds to run all queries: 0.000 seconds
        Maximum number of seconds to run all queries: 0.016 seconds
        Number of clients running queries: 5
        Average number of queries per client: 6

ILMAN INDEKSOINTIA: 
Benchmark
        Average number of seconds to run all queries: 0.431 seconds
        Minimum number of seconds to run all queries: 0.218 seconds
        Maximum number of seconds to run all queries: 1.234 seconds
        Number of clients running queries: 5
        Average number of queries per client: 6