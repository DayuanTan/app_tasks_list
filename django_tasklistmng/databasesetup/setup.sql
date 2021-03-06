DROP DATABASE IF EXISTS apptasklistmng;

create database apptasklistmng;
use apptasklistmng;
create table Users
(	userno	 		INT not null AUTO_INCREMENT ,
	userfirstname	varCHAR(100) not null,
    usermiddlename	varCHAR(100),
	userlastname 	varchar(100) not null,
    usernickname	varchar(100) not null,
    useremail		varchar(100) not null,
    usergender		varchar(20) not null,
	userpwd			varchar(100) Not Null,
	userdob     	DATE not null,
	usernote1		int,
	usernote2		varchar(300),
    Constraint UsersPK Primary key (userno),
    Constraint UsersUni	Unique(usernickname)
);

    
create table Tasks(
	taskno				INT not null AUTO_INCREMENT,
    taskcontext			varchar(300) not null,
    taskddl				DATE,
    taskorder			int not null,
    taskimportant		BOOLEAN not null,
    taskisfinished		BOOLEAN not null,
	userno	 			int not null,
    Constraint TasksPK Primary key (taskno),
    CONSTRAINT TasksFK FOREIGN KEY (userno) REFERENCES Users (userno)
);

create table UserChangeRecords (
	chgno		INT not null AUTO_INCREMENT,
	chgtime 	DATETIME not null,
	chgentry	varchar(100),
	chgbefore	varchar(100),
	chgafter	varchar(100),
	chgpwd		varchar(100),
	chgpwdbefore	varchar(100),
	chgpwdafter		varchar(100),
	userno	 		int not null,
    Constraint UserChangeRecordsPK Primary key (chgno),
	CONSTRAINT UserChangeRecordsFK FOREIGN KEY (userno) REFERENCES Users (userno)
);

create table UserLoginActivityRecords (
	actno			INT not null AUTO_INCREMENT,
	acttime			DATETIME not null,
	acttype			varchar(30),
	userno	 		int not null,
    Constraint UserLoginActivityRecordsPK Primary key (actno),
    CONSTRAINT UserLoginActivityRecordsFK FOREIGN KEY (userno) REFERENCES Users (userno)
);
show tables;

insert Users
values (NULL, "testfirstname", "testmiddlename", "testlastname", "testnickname",
    "testemail"		,
    "testmale"		,
	"testpwdA1"		,
	CURDATE()     	,
	1				,
	"testnote2"
);

select * from users;


