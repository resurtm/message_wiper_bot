.PHONY: default ngrok nodemon run

default:
	@echo "no default rule"

ngrok:
	ngrok http 8950

nodemon:
	node_modules/.bin/nodemon src/index.js localhost 8950 --watch src

run:
	node src/index.js
