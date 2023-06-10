USE smart_home;

INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HEAT01','Cảm biến nhiệt độ phòng khách',true,15,50);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HEAT02','Cảm biến nhiệt độ nhà bếp',true,25,50);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HEAT03','Cảm biến nhiệt độ phòng ngủ 1',true,15,35);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HEAT04','Cảm biến nhiệt độ phòng ngủ 2',false,15,35);

INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HUMID01','Cảm biến độ ẩm phòng khách',false,30,65);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HUMID02','Cảm biến độ ẩm nhà bếp',true,25,70);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HUMID03','Cảm biến độ ẩm phòng ngủ 1',false,40,85);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('HUMID04','Cảm biến độ ẩm phòng ngủ 2',false,40,80);

INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('IR01','Cảm biến hồng ngoại cửa trước',false,NULL,NULL);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('IR02','Cảm biến hồng ngoại cửa sau',true,NULL,NULL);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('IR03','Cảm biến hồng ngoại cửa hông 1',true,NULL,NULL);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('IR04','Cảm biến hồng ngoại cửa hông 2',false,NULL,NULL);

INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('LIGHT_INTENSE01','Cảm biến ánh sáng phòng khách',true,30,90);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('LIGHT_INTENSE02','Cảm biến ánh sáng nhà bếp',false,25,90);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('LIGHT_INTENSE03','Cảm biến ánh sáng phòng ngủ 1',true,40,90);
INSERT INTO CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) VALUES('LIGHT_INTENSE04','Cảm biến ánh sáng phòng ngủ 2',false,40,90);

insert into USER values('ADMIN','át min','Nam','0123456789','admin','admin123','0123456789','admin@gmail.com','2002-01-01',true);
insert into USER values('USER01','du sờ','Nam','1234567890','user','user123','1234567890','user@gmail.com','2002-01-01',false);

	INSERT INTO THIET_BI VALUES('FAN01','Quạt phòng khách',true,false);

	INSERT INTO THIET_BI VALUES('LIGHT01','Đèn phòng khách',true,false);

	INSERT INTO THIET_BI VALUES('DOOR01','Cửa trước',null,null);


-- select * from DU_LIEU_CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN) where ma_cb='HEAT01' order by THOI_GIAN desc;
-- select * from CAM_BIEN(MA_CB,TEN,TRANG_THAI,NGUONG_DUOI,NGUONG_TREN);

INSERT INTO `du_lieu_thiet_bi` (`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('FAN01','2023-05-26 09:51:19',55.5);
INSERT INTO `du_lieu_thiet_bi` (`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('LIGHT01','2023-05-26 09:51:19',55.5);
INSERT INTO `du_lieu_thiet_bi` (`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('DOOR01','2023-05-26 09:51:19',1);
INSERT INTO `THIET_LAP_THIET_BI` (`MA_USER`,`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('ADMIN','DOOR01','2023-05-26 09:51:19',1);
INSERT INTO `du_lieu_thiet_bi` (`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('DOOR01','2023-05-27 09:51:19',0);
INSERT INTO `THIET_LAP_THIET_BI` (`MA_USER`,`MA_TB`, `THOI_GIAN`, `GIA_TRI`) VALUES('ADMIN','DOOR01','2023-05-27 09:51:19',0);