-- Migracao: adiciona a coluna "estilos" em um banco que JA existe.
--
-- Use este arquivo se voce rodou o schema.sql antes desta coluna existir.
-- Em uma instalacao nova o schema.sql ja cria a coluna, e este arquivo
-- nao e necessario (rodar ele duas vezes da erro de coluna duplicada).
--
--   mysql -u root -p < server/migration_estilos.sql

USE bandas;

ALTER TABLE bandas_rock
  ADD COLUMN estilos VARCHAR(120) NOT NULL DEFAULT '' AFTER inicio;

UPDATE bandas_rock SET estilos = 'Rock and Roll, Blues Rock'          WHERE nome = 'The Rolling Stones';
UPDATE bandas_rock SET estilos = 'Rock Progressivo, Rock Psicodelico' WHERE nome = 'Pink Floyd';
UPDATE bandas_rock SET estilos = 'Heavy Metal, Doom Metal'            WHERE nome = 'Black Sabbath';
UPDATE bandas_rock SET estilos = 'Hard Rock, Blues Rock'              WHERE nome = 'Led Zeppelin';
UPDATE bandas_rock SET estilos = 'Rock, Glam Rock'                    WHERE nome = 'Queen';
UPDATE bandas_rock SET estilos = 'Hard Rock, Rock and Roll'           WHERE nome = 'AC/DC';
UPDATE bandas_rock SET estilos = 'Thrash Metal, Heavy Metal'          WHERE nome = 'Metallica';

SELECT id, nome, inicio, estilos, disco, publico FROM bandas_rock ORDER BY nome;
