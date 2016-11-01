CREATE OR REPLACE FUNCTION log_new_invite()
RETURNS trigger AS
$BODY$
declare
sender_user_info RECORD;
receiver_user_info RECORD;
BEGIN

for receiver_user_info in 
select name from "Users" where emailid = NEW."receiverEmailid"
loop
end loop;

for sender_user_info in 
select name from "Users" where emailid = NEW."senderEmailid"
loop
end loop;

INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "status", "createdAt", "updatedAt")
VALUES(NEW."senderEmailid", sender_user_info.name, NEW."receiverEmailid" , receiver_user_info.name, 'Invite', New."id",  'New Invite', 'Not Acknowledged', now(), now());


RETURN NEW;
END;
$BODY$

LANGUAGE plpgsql VOLATILE
COST 100;


CREATE TRIGGER log_invite
  AFTER INSERT
  ON "Invitations"
  FOR EACH ROW
  EXECUTE PROCEDURE log_new_invite();


INSERT INTO public."Invitations"(
             "senderEmailid", "receiverEmailid")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com');

   select * from "Notifications" ;
   
   
   
   
   
-- Function: public.log_update_invite()

-- DROP FUNCTION public.log_update_invite();

CREATE OR REPLACE FUNCTION public.log_update_invite()
  RETURNS trigger AS
$BODY$
declare
sender_user_info RECORD;
receiver_user_info RECORD;
BEGIN

for receiver_user_info in 
select name from "Users" where emailid = NEW."receiverEmailid"
loop
end loop;

for sender_user_info in 
select name from "Users" where emailid = NEW."senderEmailid"
loop
end loop;

Update "Notifications" set "status"='Acknowledged' where "notificationMeta1" = OLD."id" ;

IF NEW."invitestatus" =  'rejected' THEN
INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "notificationMeta3", "status", "createdAt", "updatedAt")
VALUES(NEW."receiverEmailid", receiver_user_info.name, NEW."senderEmailid" , sender_user_info.name, 'Rejection', NEW."id",  NEW."status", NEW."invitestatus",'Not Acknowledged' , now(), now());

END IF;


RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.log_update_invite()
  OWNER TO postgres;



-- Table: public."Invitations"

-- DROP TABLE public."Invitations";

CREATE TABLE public."Invitations"
(
  id integer NOT NULL DEFAULT nextval('"Invitations_id_seq"'::regclass),
  "senderEmailid" character varying(255),
  "receiverEmailid" character varying(255),
  message character varying(255),
  status character varying(255),
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone,
  invitestatus character varying(255),
  CONSTRAINT "Invitations_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."Invitations"
  OWNER TO postgres;

-- Trigger: log_invite on public."Invitations"

-- DROP TRIGGER log_invite ON public."Invitations";

CREATE TRIGGER log_invite
  AFTER INSERT
  ON public."Invitations"
  FOR EACH ROW
  EXECUTE PROCEDURE public.log_new_invite();

-- Trigger: log_update_invite on public."Invitations"

-- DROP TRIGGER log_update_invite ON public."Invitations";

CREATE TRIGGER log_update_invite
  AFTER UPDATE
  ON public."Invitations"
  FOR EACH ROW
  EXECUTE PROCEDURE public.log_update_invite();

