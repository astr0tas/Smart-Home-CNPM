USE smart_home;

INSERT INTO CAM_BIEN VALUES('HEAT01','Cảm biến nhiệt độ phòng khách',true,15,50);
INSERT INTO CAM_BIEN VALUES('HEAT02','Cảm biến nhiệt độ nhà bếp',true,25,50);
INSERT INTO CAM_BIEN VALUES('HEAT03','Cảm biến nhiệt độ phòng ngủ 1',true,15,35);
INSERT INTO CAM_BIEN VALUES('HEAT04','Cảm biến nhiệt độ phòng ngủ 2',false,15,35);

INSERT INTO CAM_BIEN VALUES('HUMID01','Cảm biến độ ẩm phòng khách',false,30,65);
INSERT INTO CAM_BIEN VALUES('HUMID02','Cảm biến độ ẩm nhà bếp',true,25,70);
INSERT INTO CAM_BIEN VALUES('HUMID03','Cảm biến độ ẩm phòng ngủ 1',false,40,85);
INSERT INTO CAM_BIEN VALUES('HUMID04','Cảm biến độ ẩm phòng ngủ 2',false,40,80);

INSERT INTO CAM_BIEN VALUES('IR01','Cảm biến hồng ngoại cửa trước',false,NULL,NULL);
INSERT INTO CAM_BIEN VALUES('IR02','Cảm biến hồng ngoại cửa sau',true,NULL,NULL);
INSERT INTO CAM_BIEN VALUES('IR03','Cảm biến hồng ngoại cửa hông 1',true,NULL,NULL);
INSERT INTO CAM_BIEN VALUES('IR04','Cảm biến hồng ngoại cửa hông 2',false,NULL,NULL);

INSERT INTO CAM_BIEN VALUES('LIGHT_INTENSE01','Cảm biến ánh sáng phòng khách',true,30,90);
INSERT INTO CAM_BIEN VALUES('LIGHT_INTENSE02','Cảm biến ánh sáng nhà bếp',false,25,90);
INSERT INTO CAM_BIEN VALUES('LIGHT_INTENSE03','Cảm biến ánh sáng phòng ngủ 1',true,40,90);
INSERT INTO CAM_BIEN VALUES('LIGHT_INTENSE04','Cảm biến ánh sáng phòng ngủ 2',false,40,90);

	INSERT INTO THIET_BI VALUES('FAN01','Quạt phòng khách',true,false);
	INSERT INTO THIET_BI VALUES('FAN02','Quạt nhà bếp',false,false);
	INSERT INTO THIET_BI VALUES('FAN03','Quạt phòng ngủ 1',false,false);
	INSERT INTO THIET_BI VALUES('FAN04','Quạt phòng ngủ 2',true,false);

	INSERT INTO THIET_BI VALUES('LIGHT01','Đèn phòng khách',true,false);
	INSERT INTO THIET_BI VALUES('LIGHT02','Đèn nhà bếp',true,false);
	INSERT INTO THIET_BI VALUES('LIGHT03','Đèn phòng ngủ 1',false,false);
	INSERT INTO THIET_BI VALUES('LIGHT04','Đèn phòng ngủ 2',true,false);

	INSERT INTO THIET_BI VALUES('DOOR01','Cửa trước',null,null);
	INSERT INTO THIET_BI VALUES('DOOR02','Cửa sau',null,null);
	INSERT INTO THIET_BI VALUES('DOOR03','Cửa hông 1',null,null);
	INSERT INTO THIET_BI VALUES('DOOR04','Cửa hông 2',null,null);


-- select * from DU_LIEU_CAM_BIEN where ma_cb='HEAT01' order by THOI_GIAN desc;
-- select * from CAM_BIEN;