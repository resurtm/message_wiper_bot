.PHONY: default ngrok nodemon run

default:
	@echo "no default rule"

ngrok:
	ngrok http 8900

nodemon:
	node_modules/.bin/nodemon src/index.js localhost 8900 --watch src

run:
	node src/index.js
