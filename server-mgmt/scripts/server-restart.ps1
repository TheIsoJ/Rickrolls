Set-Location ..\..\server
pm2 delete server
Remove-Item -Path .\dist\ -Recurse
npm run start:pm2-instance
pm2 start .\dist\server.js
Set-Location ..\server-mgmt\scripts\
Clear-Host