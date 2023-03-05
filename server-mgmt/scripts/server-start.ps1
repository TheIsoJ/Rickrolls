param ( [Parameter(Mandatory = $true)] $path )

Set-Location $path\server
npm run start:pm2-instance
pm2 start .\dist\server.js
Set-Location ..
Clear-Host