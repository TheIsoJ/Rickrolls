# About this project
A service for rickrolling people. This repo contains both website and the server.

## How to run the client?
1. Open your terminal inside of your VS Code using the key combination `Ctrl+J (Cmd+J in macOS)`.
2. Move to the client folder by typing `cd client`.
3. Run `npm run dev` for starting up your dev environment for the website.

## How to run the server?
I have provided the server management scripts, that you can use to start, stop, restart and delete the server using pm2 (Process Manager for Node.js).

***REMEMBER! You must install Node.js first, before this to actually work (instructions are below 👇), then you can install pm2 globally by typing: `npm i -g pm2`***

## Instructions for installing Node.js
1. Go to the Node.js download page by clicking [this link](https://nodejs.org/en/download/).
2. Download Node.js for your specific operating system, then open the downloaded file, and then follow the on-screen instructions.
3. You're done! Congratulations 🎉

## How to run these scripts?

- Run `server-start.ps1` inside of `server-mgmt/scripts` to start your server.
- Run `server-stop.ps1` inside of `server-mgmt/scripts` to stop your server.
- Run `server-restart.ps1` inside of `server-mgmt/scripts` to restart your server.
- Run `server-delete.ps1` inside of `server-mgmt/scripts` to delete your server.