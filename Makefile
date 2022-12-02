SOURCES := $(wildcard ./*.ts)
TARGETS  := $(patsubst ./%.ts, ./%.js, $(SOURCES))

run: build
	node index.js

build: $(TARGETS)
	@echo "Build Finished"

./%.js: ./%.ts
	./node_modules/.bin/tsc $<

