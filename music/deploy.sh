#!/bin/bash

ssh pi@music.connected.house 'cd ~/connected-house && git pull origin master';
scp -r build/ css/ pi@music.connected.house:~/connected-house/music;
