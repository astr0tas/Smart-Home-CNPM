CREATE TABLE THIET_BI (
	MA_SO int auto_increment,
    MA_TB text unique,
    LOAI_TB INT not null,
    TEN VARCHAR(100) UNIQUE NOT NULL,
    TRANG_THAI BOOL,
    TU_DONG BOOL,
    PRIMARY KEY (MA_SO),
    check(LOAI_TB>=0 and LOAI_TB<=2)
);

drop table thiet_bi;

DELIMITER $$

CREATE TRIGGER tao_ma BEFORE INSERT ON THIET_BI
FOR EACH ROW
BEGIN
	DECLARE ma_chen INT;
	SET ma_chen = (SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'smart_home' AND TABLE_NAME = 'THIET_BI');

	SET NEW.MA_TB = CONCAT('DEVICE', LPAD(ma_chen, 2, '0'));
    
END $$

DELIMITER ;

drop trigger tao_ma;

insert into THIET_BI(LOAI_TB,TEN,TRANG_THAI,TU_DONG) values (0,'cua nha',0,0);