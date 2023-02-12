Set-Location ..\..\server
npm run start:pm2-instance
pm2 start .\dist\server.js
Set-Location ..\server-mgmt\scripts\
Clear-Host