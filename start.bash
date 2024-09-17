git pull origin main &&
npx prisma db pull &&
npx prisma generate &&
npm run build &&
pm2 start npm --name "administrasi-wasrik" -- start