install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

testing:
	npm jest