# Usage

Add `DATABASE_URL` to `/server/.env` file

```.env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?schema=public
```

Run inside root directory

**Docker still not working**

```powershell
cd server
npx prisma migrate dev --name init

cd ../
docker build .
docker run -e DATABASE_URL='postgresql://<user>:<password>@<host>:<port>/<db>?schema=public' -e PORT=3000 --expose 3000 <image_id>
```
