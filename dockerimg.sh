#!/bin/bash
VERSION=`date +%y.%m.%d.%H%M`
docker images|grep none|awk "{print $3}"|xargs docker rmi -f
echo "gradle clean"
#gradle clean
#gradle clean unpack
npm run build
echo "docker remove exists images"
docker rmi -f registry.sensetime.com/ar/webar:release-markerslam-${VERSION}
echo "docker build image"
docker build -t registry.sensetime.com/ar/webar:release-markerslam-${VERSION} .
echo "docker push image"
docker push registry.sensetime.com/ar/webar:release-markerslam-${VERSION}