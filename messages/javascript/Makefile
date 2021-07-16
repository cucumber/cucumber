include default.mk

JSONSCHEMAS = $(shell find ../jsonschema -name "*.json")

in-docker: .codegen
	docker image build --target javascript --tag cucumber/build-javascript --file ../../Dockerfile .
	docker run --volume ${shell pwd}/../..:/app --workdir /app/messages/javascript --entrypoint "/usr/bin/make" --tty cucumber/build-javascript clean
	docker run --volume ${shell pwd}/../..:/app --workdir /app/messages/javascript --entrypoint "/usr/bin/make" --tty cucumber/build-javascript

.codegen: src/messages.ts

src/messages.ts: $(JSONSCHEMAS) ../jsonschema/scripts/codegen.rb
	ruby ../jsonschema/scripts/codegen.rb TypeScript ../jsonschema > $@

clean:
	rm -rf dist src/types/*.ts
