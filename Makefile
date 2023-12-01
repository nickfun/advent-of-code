SOURCES := $(wildcard ./*.ts ./2021/*.ts ./2022/*.ts ./2023/*.ts )
TARGETS  := $(patsubst ./%.ts, ./%.js, $(SOURCES))

run: format build
	@echo
	@node index.js

build: $(TARGETS) 
	@echo "Build Finished"
	@echo
	@echo

./%.js: ./%.ts
	./node_modules/.bin/tsc $< --lib es2021

clean:
	rm *.js
	rm -rf node_modules

install: package.json 
	yarn install 

format:
	node node_modules/.bin/prettier 2023/*.ts 2022/*.ts *.ts 2021/*.ts -w > /dev/null
