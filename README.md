# connected-house
A open source connected house.

## Functionnalities

- Music player : Deezer API / Spotify API / Volumino
- Indoor camera
- Indoor monitoring
- Lights

## Configuration

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
