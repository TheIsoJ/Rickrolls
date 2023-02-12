Set-Location ..\..\server
pm2.ps1 stop server
Remove-Item -Path .\dist -Recurse
Set-Location -Path ..\server-mgmt\scripts
Clear-Host