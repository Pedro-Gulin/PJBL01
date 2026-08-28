CREATE DATABASE IF NOT EXISTS bandas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bandas;

CREATE TABLE IF NOT EXISTS bandas_rock (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nome    VARCHAR(120) NOT NULL,
  inicio  SMALLINT UNSIGNED NOT NULL,
  disco   VARCHAR(160) NOT NULL,
  publico INT UNSIGNED NOT NULL DEFAULT 0
);

INSERT INTO bandas_rock (nome, inicio, disco, publico)
SELECT * FROM (
  SELECT 'The Rolling Stones' AS nome, 1962 AS inicio, 'Sticky Fingers' AS disco, 1500000 AS publico
  UNION ALL SELECT 'Pink Floyd',   1965, 'The Dark Side of the Moon', 200000
  UNION ALL SELECT 'Black Sabbath', 1968, 'Paranoid',                 120000
  UNION ALL SELECT 'Led Zeppelin',  1968, 'Led Zeppelin IV',           56800
  UNION ALL SELECT 'Queen',         1970, 'Greatest Hits',            250000
  UNION ALL SELECT 'AC/DC',         1973, 'Back in Black',            500000
  UNION ALL SELECT 'Metallica',     1981, 'Metallica (Black Album)',  500000
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM bandas_rock);
