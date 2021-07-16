SHELL := /usr/bin/env bash
RUBY_SOURCE_FILES = $(shell find . -name "*.rb")
GEMSPEC = $(shell find . -name "*.gemspec")
LIBNAME := $(shell basename $$(dirname $$(pwd)))
GEM := cucumber-$(LIBNAME)-$(NEW_VERSION).gem

default: .tested
.PHONY: default

.deps: Gemfile.lock
	touch $@

Gemfile.lock: Gemfile $(GEMSPEC)
	bundle install
	touch $@

.tested: .deps $(RUBY_SOURCE_FILES)
	bundle exec rspec --color
	touch $@

update-dependencies:
	./scripts/update-gemspec
.PHONY: update-dependencies

ifdef NEW_VERSION
ifneq (,$(GEMSPEC))
gem: $(GEM)
else
gem:
	@echo "Not building gem because there is no gemspec"
endif
endif
.PHONY: gem

$(GEM): .tested
	gem build $(GEMSPEC)
	test -s "$(GEM)" || { echo "Gem not built: $(GEM)"; exit 1; }

remove-local-dependencies:
	cat Gemfile | sed 's/^gem /#gem /' > Gemfile.tmp
	mv Gemfile.tmp Gemfile
.PHONY: remove-local-dependencies

pre-release: remove-local-dependencies update-version update-dependencies gem
.PHONY: pre-release

update-version:
ifdef NEW_VERSION
ifneq (,$(GEMSPEC))
	sed -i "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1$(NEW_VERSION)\2/" $(GEMSPEC)
endif
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't update version :-(\033[0m"
	exit 1
endif
.PHONY: update-version

publish: gem
ifneq (,$(GEMSPEC))
	gem push $(GEM)
else
	@echo "Not publishing because there is no gemspec"
endif
.PHONY: publish

post-release:
	cat Gemfile | sed 's/^#gem /gem /' > Gemfile.tmp
	mv Gemfile.tmp Gemfile
.PHONY: post-release

clean: clean-ruby
.PHONY: clean

clean-ruby:
	rm -f .deps .linked .tested* Gemfile.lock *.gem
.PHONY: clean-ruby
