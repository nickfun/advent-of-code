SOURCES := $(wildcard ./*.ts)
IMAGES  := $(patsubst ./%.ts, ./%.js, $(SOURCES))

run: build
	node index.js

build: $(IMAGES)
	@echo "Build Finished"

./%.js: ./%.ts
	./node_modules/.bin/tsc $<

