-- -----------------------------------------------------
-- Table `Klient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Klient` ;

CREATE TABLE IF NOT EXISTS `Klient` (
                                        `idKlient` INTEGER NOT NULL,
                                        `nazwiskoKlient` VARCHAR(45) NOT NULL,
    `imieKlient` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `haslo` VARCHAR(45) NOT NULL,
    `isAdmin` INTEGER DEFAULT(0),
    PRIMARY KEY (`idKlient`));

-- -----------------------------------------------------
-- Table `Rodzaj`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rodzaj` ;

CREATE TABLE IF NOT EXISTS `Rodzaj` (
                                        `idRodzaj` INTEGER NOT NULL,
                                        `nazwa` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Rezyser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rezyser` ;

CREATE TABLE IF NOT EXISTS `Rezyser` (
                                         `idRezyser` INTEGER NOT NULL,
                                         `nazwiskoRezyser` VARCHAR(45) NOT NULL,
    `imieRezyser` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idRezyser`));

-- -----------------------------------------------------
-- Table `Film`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Film` ;

CREATE TABLE IF NOT EXISTS `Film` (
                                      `idFilm` INTEGER NOT NULL,
                                      `Rodzaj_id` INTEGER NOT NULL,
                                      `Rezyser_id` INTEGER NOT NULL,
                                      `nazwa` VARCHAR(45) NOT NULL,
    `plakat` VARCHAR(45) NOT NULL,
    `opis` VARCHAR(45) NOT NULL,
    `cena` INTEGER NOT NULL,
    PRIMARY KEY (`idFilm`),
    FOREIGN KEY (`Rodzaj_id`)
    REFERENCES `Rodzaj` (`idRodzaj`),
    FOREIGN KEY (`Rezyser_id`)
    REFERENCES `Rezyser` (`idRezyser`)
    );

-- -----------------------------------------------------
-- Table `Kopia_filmu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Kopia_filmu` ;

CREATE TABLE IF NOT EXISTS `Kopia_filmu` (
                                             `idKopia_filmu` INTEGER NOT NULL,
                                             `Film_idFilm` INTEGER NOT NULL,
                                             PRIMARY KEY (`idKopia_filmu`),
    FOREIGN KEY (`Film_idFilm`)
    REFERENCES `Film` (`idFilm`)
    );

-- -----------------------------------------------------
-- Table `Wypozyczenie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Wypozyczenie` ;

CREATE TABLE IF NOT EXISTS `Wypozyczenie` (
                                              `idWypozyczenie` INTEGER NOT NULL,
                                              `termin_od` DATETIME NOT NULL,
                                              `termin_do` DATETIME NOT NULL,
                                              `Klient_id` INTEGER NOT NULL,
                                              `Kopia_filmu_id` INTEGER NOT NULL,
                                              PRIMARY KEY (`idWypozyczenie`),
    FOREIGN KEY (`Klient_id`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Kopia_filmu_id`)
    REFERENCES `Kopia_filmu` (`idKopia_filmu`));

-- -----------------------------------------------------
-- Table `Aktor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Aktor` ;

CREATE TABLE IF NOT EXISTS `Aktor` (
                                       `idAktor` INTEGER NOT NULL,
                                       `nazwiskoAktor` VARCHAR(45) NOT NULL,
    `imieAktor` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idAktor`));



-- -----------------------------------------------------
-- Table `Ocena`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ocena` ;

CREATE TABLE IF NOT EXISTS `Ocena` (
                                       `idOcena` INTEGER NOT NULL,
                                       `scenariusz` INTEGER NOT NULL,
                                       `rezyseria` INTEGER NOT NULL,
                                       `dzwiek` INTEGER NOT NULL,
                                       `montaz` INTEGER NOT NULL,
                                       `Film_id` INTEGER NOT NULL,
                                       `Klient_idKlient` INTEGER NOT NULL,
                                       PRIMARY KEY (`idOcena`),
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Film_id`)
    REFERENCES `Film` (`idFilm`));



-- -----------------------------------------------------
-- Table `Recenzja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Recenzja` ;

CREATE TABLE IF NOT EXISTS `Recenzja` (
                                          `idRecenzja` INTEGER NOT NULL,
                                          `Klient_idKlient` INTEGER NOT NULL,
                                          `Film_idFilm` INTEGER NOT NULL,
                                          `trescRecenzja` VARCHAR(45) NOT NULL,
    `Ocena_id` INTEGER NOT NULL,
    PRIMARY KEY (`idRecenzja`),
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Film_idFilm`)
    REFERENCES `Film` (`idFilm`),
    FOREIGN KEY (`Ocena_id`)
    REFERENCES `Ocena` (`idOcena`)
    );



-- -----------------------------------------------------
-- Table `Lista_aktorow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Lista_aktorow` ;

CREATE TABLE IF NOT EXISTS `Lista_aktorow` (
                                               `Film_idFilm` INTEGER NOT NULL,
                                               `Aktor_idAktor` INTEGER NOT NULL,
                                               PRIMARY KEY (`Film_idFilm`, `Aktor_idAktor`),
    FOREIGN KEY (`Film_idFilm`)
    REFERENCES `Film` (`idFilm`),
    FOREIGN KEY (`Aktor_idAktor`)
    REFERENCES `Aktor` (`idAktor`)
    );
