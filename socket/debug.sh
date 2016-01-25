#!/bin/bash

ssh pi@socket.connected.house 'tail -f /home/pi/.forever/socket.log';
