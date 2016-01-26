#!/bin/bash

ssh pi@music.connected.house 'cd ~/connected-house && git pull origin master';
scp -r public/build/ public/css/ pi@music.connected.house:~/connected-house/music/public/;
