git pull origin master &&
npx prisma db pull &&
npx prisma generate &&
npm run build &&
pm2 restart administrasi-wasrik