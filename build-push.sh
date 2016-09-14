cd node/
grunt require-task
node build
echo build completed...

cd ../
git status
git add -A
git commit -m update
git push origin master
echo Press ENTER to quit...
read