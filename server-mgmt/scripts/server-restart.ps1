param ( [Parameter(Mandatory = $true)] $path )

Set-Location $path\server
pm2 delete server
Remove-Item -Path .\dist\ -Recurse
npm run start:pm2-instance
pm2 start .\dist\server.js
Set-Location ..
Clear-Host