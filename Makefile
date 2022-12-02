SOURCES := $(wildcard ./*.ts)
TARGETS  := $(patsubst ./%.ts, ./%.js, $(SOURCES))

run: build
	node index.js

build: $(TARGETS) 
	@echo "Build Finished"

./%.js: ./%.ts
	./node_modules/.bin/tsc $<

clean:
	rm *.js
	rm -rf node_modules

install: package.json 
	yarn install 

format:
	node node_modules/.bin/prettier *.ts -w
