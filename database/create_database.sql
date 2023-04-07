DROP SCHEMA IF EXISTS smart_home;
CREATE SCHEMA smart_home;
USE smart_home;

CREATE TABLE USER (
    MA_USER VARCHAR(10),
    TEN VARCHAR(255) NOT NULL,
    GIOI_TINH VARCHAR(10) NOT NULL,
    CCCD VARCHAR(12) NOT NULL,
    TAI_KHOAN VARCHAR(255) UNIQUE NOT NULL,
    MAT_KHAU VARCHAR(255) NOT NULL,
    SDT VARCHAR(10),
    EMAIL VARCHAR(255),
    NGAY_SINH date,
    PRIMARY KEY (MA_USER)
);

CREATE TABLE THIET_BI (
    MA_TB VARCHAR(10),
    TEN VARCHAR(100) UNIQUE NOT NULL,
    TRANG_THAI BOOL,
    TU_DONG BOOL,
    PRIMARY KEY (MA_TB),
    CHECK((MA_TB LIKE 'DOOR%' AND TU_DONG IS NULL) OR MA_TB LIKE 'FAN%' OR MA_TB LIKE 'LIGHT%')
);

CREATE TABLE CAM_BIEN (
    MA_CB VARCHAR(20),
    TEN VARCHAR(100) UNIQUE NOT NULL,
    TRANG_THAI BOOL,
    NGUONG_TREN FLOAT,
    NGUONG_DUOI FLOAT,
    PRIMARY KEY (MA_CB),
    CHECK (MA_CB LIKE 'HEAT%' OR MA_CB LIKE 'HUMID%' OR MA_CB LIKE 'LIGHT_INTENSE%' OR (MA_CB LIKE 'IR%' AND NGUONG_TREN IS NULL AND NGUONG_DUOI IS NULL))  
);

CREATE TABLE ADMIN (
    MA_USER VARCHAR(10),
    PRIMARY KEY (MA_USER),
    FOREIGN KEY (MA_USER)
        REFERENCES USER(MA_USER)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE USER_THONG_THUONG (
    MA_USER VARCHAR(10),
    TRANG_THAI VARCHAR(20),
    PRIMARY KEY (MA_USER),
    FOREIGN KEY (MA_USER)
        REFERENCES USER(MA_USER)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DEN (
    MA_TB VARCHAR(10),
    PRIMARY KEY (MA_TB),
    FOREIGN KEY (MA_TB)
        REFERENCES THIET_BI(MA_TB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE QUAT (
    MA_TB VARCHAR(10),
    PRIMARY KEY (MA_TB),
    FOREIGN KEY (MA_TB)
        REFERENCES THIET_BI(MA_TB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CUA (
    MA_TB VARCHAR(10),
    PRIMARY KEY (MA_TB),
    FOREIGN KEY (MA_TB)
        REFERENCES THIET_BI(MA_TB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DO_AM (
    MA_CB VARCHAR(20),
    PRIMARY KEY (MA_CB),
    FOREIGN KEY (MA_CB)
        REFERENCES CAM_BIEN(MA_CB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ANH_SANG (
    MA_CB VARCHAR(20),
    PRIMARY KEY (MA_CB),
    FOREIGN KEY (MA_CB)
        REFERENCES CAM_BIEN(MA_CB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NHIET_DO (
    MA_CB VARCHAR(20),
    PRIMARY KEY (MA_CB),
    FOREIGN KEY (MA_CB)
        REFERENCES CAM_BIEN(MA_CB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE HONG_NGOAI (
    MA_CB VARCHAR(20),
    PRIMARY KEY (MA_CB),
    FOREIGN KEY (MA_CB)
        REFERENCES CAM_BIEN(MA_CB)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE THIET_LAP_THIET_BI(
	MA VARCHAR(10),
    THOI_GIAN DATETIME,
    MA_USER VARCHAR(10),
    MA_TB VARCHAR(10),
    TRANG_THAI BOOL,
    GIA_TRI FLOAT,
    TU_DONG BOOL,
    GIO_BAT_DAU TIME,
    GIO_KET_THUC TIME,
    PRIMARY KEY(MA,THOI_GIAN,MA_USER,MA_TB),
    FOREIGN KEY(MA_USER) REFERENCES USER(MA_USER) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(MA_TB) REFERENCES THIET_BI(MA_TB) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE THIET_LAP_CAM_bIEN(
	MA VARCHAR(10),
    THOI_GIAN DATETIME,
    MA_USER VARCHAR(10),
    MA_CB VARCHAR(20),
    TRANG_THAI BOOL,
    NGUONG_TREN FLOAT,
    NGUONG_DUOI FLOAT,
    PRIMARY KEY(MA,THOI_GIAN,MA_USER,MA_CB),
    FOREIGN KEY(MA_USER) REFERENCES USER(MA_USER) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(MA_CB) REFERENCES CAM_BIEN(MA_CB) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DU_LIEU_CAM_bIEN(
    MA_CB VARCHAR(20) REFERENCES CAM_BIEN(MA_CB),
    MA VARCHAR(10),
    THOI_GIAN DATETIME,
    GIA_TRI FLOAT,
    PRIMARY KEY(MA_CB,MA,THOI_GIAN)
);

CREATE TABLE DU_LIEU_THIET_BI(
    MA_TB VARCHAR(20) REFERENCES THIET_BI(MA_TB),
    MA VARCHAR(10),
    THOI_GIAN DATETIME,
    GIA_TRI FLOAT,
    PRIMARY KEY(MA_TB,MA,THOI_GIAN)
);