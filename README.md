# Usage

Add `DATABASE_URL` to `/server/.env` file

```.env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?schema=public
```

Optional. If the database is not initialized yet.

```powershell
cd server
npx prisma migrate dev --name init
```

Build Docker container

```powershell
docker build . -t <app-name>
```

Run Docker container

```powershell
docker run -d \
 -e DATABASE_URL='postgresql://<user>:<password>@<host>:<port>/<db>?schema=public' \
 -p <your_port>:3000 \
 --name <running-app-name> \
 --restart unless-stopped \
 <app-name>
```
