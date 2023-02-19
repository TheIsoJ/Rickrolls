# About this project
A service for rickrolling people. This repo contains both website and the server.

## How to run the client?
1. Open your terminal inside of your VS Code using the key combination `Ctrl+J (Cmd+J in macOS)`.
2. Move to the client folder by typing `cd client`.
3. Run `npm run dev` for starting up your dev environment for the website.

## How to run the server?
I have provided the server management scripts, that you can use to start, stop, restart and delete the server using pm2 (Process Manager for Node.js).

- Run `server-start.ps1` inside of `server-mgmt/scripts` to start up your dev environment.
- Run `server-stop.ps1` inside of `server-mgmt/scripts` to stop up your dev environment.
- Run `server-restart.ps1` inside of `server-mgmt/scripts` to restart your dev environment.
- Run `server-delete.ps1` inside of `server-mgmt/scripts` to delete your dev environment.