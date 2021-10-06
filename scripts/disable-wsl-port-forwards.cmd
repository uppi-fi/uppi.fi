@echo off
for /f %%i in ('wsl hostname -I') do set WSL_IP=%%i
netsh interface portproxy delete v4tov4 listenport=3005 listenaddress=%WSL_IP%
netsh interface portproxy delete v4tov4 listenport=5433 listenaddress=%WSL_IP%
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=%WSL_IP%
netsh interface portproxy show all
pause