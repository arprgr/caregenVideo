CREATE OR REPLACE FUNCTION log_new_connection()
RETURNS trigger AS
$BODY$
declare
sender_user_info RECORD;
receiver_user_info RECORD;
BEGIN

for receiver_user_info in 
select name from "Users" where emailid = NEW."connectedToEmailid"
loop
end loop;

for sender_user_info in 
select name from "Users" where emailid = NEW."primaryEmailid"
loop
end loop;

INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "status", "createdAt", "updatedAt")
VALUES(NEW."primaryEmailid", sender_user_info.name, NEW."connectedToEmailid" , receiver_user_info.name, 'Connection', New."id",  'Connect done', 'Not Acknowledged', now(), now());


RETURN NEW;
END;
$BODY$

LANGUAGE plpgsql VOLATILE
COST 100;

CREATE TRIGGER log_connection
  AFTER INSERT
  ON "Connections"
  FOR EACH ROW
  EXECUTE PROCEDURE log_new_connection();


INSERT INTO public."Connections"(
             "primaryEmailid", "connectedToEmailid")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com');

   select * from "Notifications" ;

   