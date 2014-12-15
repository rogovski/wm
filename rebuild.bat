: nodemon --exec "rebuild.bat" ./rebuild.bat
: npm run watch

: loop

call npm run build

set /p DUMMY=Hit ENTER to continue...

if defined dummy (echo not just ENTER was pressed) else (goto loop)
