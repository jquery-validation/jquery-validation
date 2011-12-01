#!/bin/bash
if [ -z "$1" -o -z "$2" ]; then
	echo "Needs to be called with two arguments, current and next version: ./build/release.sh 1.9.0 2.0.0pre"
	exit 1
fi
echo $1 > version.txt
git add version.txt
git commit -m "Tagging $1 release"
git tag $1
echo "Running ant"
ant

echo "Bumping version to $2"
echo $2 > version.txt
git add version.txt
git commit -m "Bumping version to $2"
