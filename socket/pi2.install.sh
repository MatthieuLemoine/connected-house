#!/bin/bash

sudo apt-get install git
cd /tmp && wget https://nodejs.org/dist/latest-v5.x/node-v5.3.0-linux-armv7l.tar.gz;
tar -xzf node-v5.3.0-linux-armv7l.tar.gz;
sudo rm node-v5.3.0-linux-armv7l.tar.gz;
sudo rm -R /opt/nodejs/node-v5.3.0-linux-armv7l/;
sudo mv node-v5.3.0-linux-armv7l/ /opt/nodejs/;
sudo rm /usr/bin/node /usr/sbin/node /sbin/node /usr/local/bin/node /usr/bin/npm /usr/sbin/npm /sbin/npm /usr/local/bin/npm;
sudo ln -s /opt/nodejs/bin/node /usr/bin/node;
sudo ln -s /opt/nodejs/bin/node /usr/sbin/node;
sudo ln -s /opt/nodejs/bin/node /sbin/node;
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node;
sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm;
