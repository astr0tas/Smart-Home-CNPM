create user 'smarthome'@'localhost' identified with mysql_native_password by 'smarthome123';
-- Or use this line if the above one does not work
-- create user 'smarthome'@'localhost' identified by 'smarthome123';

grant all privileges on smart_home.* to 'smarthome'@'localhost';

grant file on *.* to 'smarthome'@'localhost';