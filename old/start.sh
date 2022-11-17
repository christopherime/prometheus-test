#!/bin/bash
# test if ./logs directory exists, if not create it
if [ ! -d ./logs ]; then
	mkdir ./logs
fi

# test if there is files in .logs directory, if yes archive it
if [ "$(ls -A ./logs)" ]; then	
	echo "Archiving previous logs"
	export ARCHIVELOGSDIR=$PWD/logs/$(date +%Y%m%d%H%M%S)-logs
	mkdir $ARCHIVELOGSDIR
	mv ./logs/* $ARCHIVELOGSDIR
	tar -czvf $ARCHIVELOGSDIR.tar.gz $ARCHIVELOGSDIR
fi

echo "Starting container detached"
docker compose up -d

echo "Waiting for 10 seconds"
sleep 10

echo "Printing containers logs"
docker compose logs

echo "Display containers status"
docker compose ps

