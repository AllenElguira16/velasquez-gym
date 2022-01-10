@echo off
cls
IF exist web/node_modules (
	cd web && npm run start
) ELSE (
	echo Installing Backend Modules
	cd web && npm install && npm run start
)
