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

INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "notificationMeta3", "notificationMeta4", "status", "createdAt", "updatedAt")
VALUES(NEW."senderEmailId", sender_user_info.name, NEW."receiverEmailId" , receiver_user_info.name, 'Message', NEW."id",  NEW."vMessageURL", NEW."vMessageThumb", NEW."status", 'Not Acknowledged', now(), now());


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
   
   
CREATE OR REPLACE FUNCTION public.log_update_message()
  RETURNS trigger AS
$BODY$
BEGIN

Update "Notifications" set "status"='Acknowledged' where "notificationMeta1" = OLD."id" ;


RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.log_update_message()
  OWNER TO postgres;


CREATE TRIGGER log_update_invite
  AFTER UPDATE
  ON public."Messages"
  FOR EACH ROW
  EXECUTE PROCEDURE public.log_update_message();

select * from "Invitations" ;
select * from "Notifications" ;
select * from "Connections" ;
select * from "Messages" ;

INSERT INTO public."Invitations"(
             "senderEmailid", "receiverEmailid")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com');

update "Invitations" set  status='Accepted' where "id" = 74;

INSERT INTO public."Messages"(
             "senderEmailId", "receiverEmailId",  "vMessageURL")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com',  'someURL');

update "Messages" set status='Read' where "id" = 196;       