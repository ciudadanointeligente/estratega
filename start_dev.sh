#!/bin/sh

sudo service postgresql start

rails s -b $IP -p $PORT