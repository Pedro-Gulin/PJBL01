CREATE DATABASE IF NOT EXISTS bandas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bandas;

CREATE TABLE IF NOT EXISTS bandas_rock (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nome    VARCHAR(120) NOT NULL,
  inicio  SMALLINT UNSIGNED NOT NULL,
  estilos VARCHAR(120) NOT NULL DEFAULT '',
  disco   VARCHAR(160) NOT NULL,
  publico INT UNSIGNED NOT NULL DEFAULT 0
);

INSERT INTO bandas_rock (nome, inicio, estilos, disco, publico)
SELECT * FROM (
  SELECT 'The Rolling Stones' AS nome, 1962 AS inicio, 'Rock and Roll, Blues Rock' AS estilos, 'Sticky Fingers' AS disco, 1500000 AS publico
  UNION ALL SELECT 'Pink Floyd',   1965, 'Rock Progressivo, Rock Psicodelico', 'The Dark Side of the Moon', 200000
  UNION ALL SELECT 'Black Sabbath', 1968, 'Heavy Metal, Doom Metal',           'Paranoid',                 120000
  UNION ALL SELECT 'Led Zeppelin',  1968, 'Hard Rock, Blues Rock',             'Led Zeppelin IV',           56800
  UNION ALL SELECT 'Queen',         1970, 'Rock, Glam Rock',                   'Greatest Hits',            250000
  UNION ALL SELECT 'AC/DC',         1973, 'Hard Rock, Rock and Roll',          'Back in Black',            500000
  UNION ALL SELECT 'Metallica',     1981, 'Thrash Metal, Heavy Metal',         'Metallica (Black Album)',  500000
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM bandas_rock);
