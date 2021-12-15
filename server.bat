@echo off
cls 
IF exist api/node_modules (
	cd api && npm run dev
) ELSE (
	echo Installing Backend Modules
	cd api && npm install && npm run dev
)
