Set-Location ..\..\server
pm2 delete server
Remove-Item -Path .\dist\ -Recurse
Set-Location ..\server-mgmt\scripts\
Clear-Host