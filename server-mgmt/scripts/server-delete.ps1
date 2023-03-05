param ( [Parameter(Mandatory = $true)] $path )

Set-Location $path\server
pm2 delete server
Remove-Item -Path .\dist\ -Recurse
Set-Location ..
Clear-Host