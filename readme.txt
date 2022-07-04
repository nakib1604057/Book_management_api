
# Book Management REST API

User can create account. He/she can signUp and signIn. Anyone can see books collection. 
Authorize user can so some task like:
 - User can create book.
 - User can share book with other users.
 - User can see his own share list.
 - User can see his own book collection.
 - User can access book that are shared with him.
 

## Prerequisites
Postgresql database. (mandatory)

install "Prisma" and "rest client" pluign for VSCode. (not mandatory)
## Appendix

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

For more info go to the link below

https://www.prisma.io/docs/concepts/database-connectors/postgresql

3.npx prisma migrate dev

4.npx prisma studio (for vewing database in prisma client,not mandatory)

5.Goto (http.rest) file and start using REST APIs.

Or you can use any tool like (Postman,Insomina) to use this APIS. 


