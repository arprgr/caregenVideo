CREATE OR REPLACE FUNCTION log_new_message()
RETURNS trigger AS
$BODY$
declare
sender_user_info RECORD;
receiver_user_info RECORD;
BEGIN

for receiver_user_info in 
select name from "Users" where emailid = NEW."receiverEmailId"
loop
end loop;

for sender_user_info in 
select name from "Users" where emailid = NEW."senderEmailId"
loop
end loop;

INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "status", "createdAt", "updatedAt")
VALUES(NEW."senderEmailId", sender_user_info.name, NEW."receiverEmailId" , receiver_user_info.name, 'Message', NEW."vMessageURL",  NEW."vMessageURL", 'Not Acknowledged', now(), now());


RETURN NEW;
END;
$BODY$

LANGUAGE plpgsql VOLATILE
COST 100;


CREATE TRIGGER log_message
  AFTER INSERT
  ON "Messages"
  FOR EACH ROW
  EXECUTE PROCEDURE log_new_message();


INSERT INTO public."Messages"(
             "senderEmailId", "receiverEmailId",  "vMessageURL")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com',  'someURL');

   select * from "Notifications" ;