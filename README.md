# connected-house
A open source connected house.

## Functionnalities

- Music player : Deezer API / Spotify API
- Wake on LAN
- Indoor camera
- Indoor monitoring
- Lights
- Mirror : Meteo / News RSS Feed / Agenda / Face recognition(wake up, mood,...) / Heating resistor

## Technologies

This project uses a bunch of great tools and technologies such as :

- [node.js](http://nodejs.org/)
- [nw.js](https://github.com/nwjs/nw.js)
- [Angular](https://angularjs.org/)
- [Angular Material](https://material.angularjs.org/)
- [socket.io](http://socket.io/)
- [gulp](http://gulpjs.com/)
- [sass](http://sass-lang.com/)

I used this [seed](https://github.com/MatthieuLemoine/angular-material-express-seed.git) to bootstrap my apps.

## Install

These apps require [nw.js](https://github.com/nwjs/nw.js) to be used as desktop app.

- Install nw.js
- Install gulp `npm install -g gulp`
- Install nginx `sudo apt-get install nginx` or apache to create VHosts (optionnal)

## Run

Open 3 terminals

    cd socket & npm start
    cd panel & npm start
    cd music & npm start

## Configuration

### DNS records

With dd-wrt :

    address=/socket.connected.house/192.168.1.10
    address=/music.connected.house/192.168.1.11
    address=/panel.connected.house/192.168.1.12

### nginx

I use nginx as a web server to serve my apps.

For convenience, you can create a virtual host for each apps.

Music App :

    server {
        listen 80;
        server_name music.connected.house;
        access_log /var/log/nginx/music.connected.house.log;
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:3001/;
                proxy_redirect off;
        }
    }

Socket Server :

    server {
            listen 80;
            server_name socket.connected.house;
            access_log /var/log/nginx/socket.connected.house.log;
            location / {
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_set_header X-NginX-Proxy true;

                    proxy_pass http://localhost:3003/;
                    proxy_redirect off;
            }
    }

panel App :

    server {
            listen 80;
            server_name panel.connected.house;
            access_log /var/log/nginx/panel.connected.house.log;
            location / {
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_set_header X-NginX-Proxy true;

                    proxy_pass http://localhost:3002/;
                    proxy_redirect off;
            }
    }

And add these following DNS entries in your /etc/hosts or in your router DNS conf :

    127.0.0.1       music.connected.house
    127.0.0.1       socket.connected.house
    127.0.0.1       panel.connected.house  

Replace 127.0.0.1 by your device IP. To avoid any issue, you should attribute fix IPs to all your devices.
