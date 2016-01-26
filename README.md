# connected-house
A open source connected house.

## Screens

- Music player

![music_player](https://cloud.githubusercontent.com/assets/8517072/12561916/b4881d1c-c3a2-11e5-8c52-483bfcefc87f.png)

## Functionnalities

- Music player : Deezer API / Spotify API
- Wake on LAN
- Indoor camera
- Indoor monitoring
- Lights
- Mirror : Meteo / News RSS Feed / Agenda / Face recognition(wake up, mood,...) / Heating resistor / Mails

## Technologies

This project uses a bunch of great tools and technologies such as :

- [node.js](http://nodejs.org/)
- [Electron](http://electron.atom.io/)
- [Angular](https://angularjs.org/)
- [Angular Material](https://material.angularjs.org/)
- [socket.io](http://socket.io/)
- [gulp](http://gulpjs.com/)
- [sass](http://sass-lang.com/)

I used this [seed](https://github.com/MatthieuLemoine/angular-material-express-seed.git) to bootstrap my apps.

## Install

- Install gulp `npm install -g gulp` to build js/css
- Install nginx `sudo apt-get install nginx` to proxy request to the socket server

## Run

Open 3 terminals

    cd socket & npm start
    cd panel & npm start
    cd music & npm start

## Configuration

### DNS records

With dd-wrt :

    address=/socket.connected.house/192.168.1.12
    address=/music.connected.house/192.168.1.11
    address=/panel.connected.house/192.168.1.10

### nginx

I use nginx as a proxy to the socket server.

Socket Server :

    server {
            listen 80;
            server_name socket.connected.house;
            access_log /var/log/nginx/socket.connected.house.log;
            location / {
            proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $host;
                    proxy_set_header X-NginX-Proxy true;

                    proxy_pass http://localhost:3003/;
                    proxy_redirect off;
            }
    }

And add this following DNS entry in your /etc/hosts on all your devices :

    192.168.1.12       socket.connected.house
