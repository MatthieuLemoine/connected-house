#!/bin/bash

ssh pi@socket.connected.house 'cd ~/connected-house && git pull origin master && forever restart 0'
