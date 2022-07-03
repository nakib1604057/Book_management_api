Pre Requirements:
(Mandatory)
Postgresql database.
(not mandatory)
install "Prisma" and "rest client" pluign for VSCode.
Commend:
1.npm install
2.npx prisma init
Then go to .env file generated autometicaly after the commend. Change the DATABASE_URL accrodingly.
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
Change this url accrodingly:
USER-your username in postgresql DB
PASSWORD - with your postgresql DB PASSWORD
HOST - localhost
PORT - generally it is 5432
mydb - your database

for more info go to the link below
https://www.prisma.io/docs/concepts/database-connectors/postgresql

3.npx prisma migrate dev
4.npx prisma studio (for vewing database in prisma client,not mandatory)
4.Goto (http.rest) file and start using REST APIs.
Or you can use any tool like (Postman,Insomina) to use this APIS. 
 
