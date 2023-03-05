param ( [Parameter(Mandatory = $true)] $path )

Set-Location $path\server
pm2.ps1 stop server
Remove-Item -Path .\dist -Recurse
Set-Location ..
Clear-Host