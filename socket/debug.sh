#!/bin/bash

ssh pi@music.connected.house 'cd ~/connected-house/socket && tail -f socket.log';
