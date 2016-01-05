#!/bin/bash

cd /tmp && wget https://nodejs.org/dist/latest-v4.x/node-v4.2.4-linux-armv6l.tar.gz;
tar -xzf node-v4.2.4-linux-armv6l.tar.gz;
sudo rm node-v4.2.4-linux-armv6l.tar.gz;
cd node-v4.2.4-linux-armv6l/;
rm -f /usr/local/bin/node /usr/local/bin/npm;
sudo cp bin/node /usr/local/bin/node;
sudo cp -R lib/node_modules /usr/local/lib/;
sudo ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm;
