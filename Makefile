SOURCES := $(wildcard ./*.ts ./2021/*.ts ./2022/*.ts )
TARGETS  := $(patsubst ./%.ts, ./%.js, $(SOURCES))

run: format build
	node index.js

build: $(TARGETS) 
	@echo "Build Finished"
	@echo
	@echo

./%.js: ./%.ts
	./node_modules/.bin/tsc $<

clean:
	rm *.js
	rm -rf node_modules

install: package.json 
	yarn install 

format:
	node node_modules/.bin/prettier 2022/*.ts *.ts 2021/*.ts -w > /dev/null
