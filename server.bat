@echo off
cls 
IF exist api/node_modules (
	cd api && npm start
) ELSE (
	echo Installing Backend Modules
	cd api && npm install && npm start
)