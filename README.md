# Usage

Add `DATABASE_URL` to `/server/.env` file

```.env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?schema=public
```

Run

```powershell
cd server
npx prisma migrate dev --name init

cd ../
docker build .
docker run -e DATABASE_URL='postgresql://<user>:<password>@<host>:<port>/<db>?schema=public' -p <your_port>:3000 <image_id>
```
