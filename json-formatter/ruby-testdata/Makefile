include default.mk

CCK_PATH = ../../compatibility-kit
CCK_FEATURES=$(call rwildcard,$(CCK_PATH)/javascript/features,*.feature)
FEATURES=$(patsubst $(CCK_PATH)/javascript/%,%,$(CCK_FEATURES))
STEP_DEFINITIONS=$(patsubst %,%.rb,$(FEATURES))
JSONS_GOLDEN  = $(patsubst features/%,features/%.json,$(FEATURES))

.tested: $(JSONS_GOLDEN)

features/%.json: features/%-unprocessed.json
	cat $< | \
		./neutralize-json | \
		jq --sort-keys "." > $@

# Dirty hack: the Ruby version we use do not support some features.
features/pending/pending.feature.json:
	mkdir -p $(@D)
	echo "[]" > $@

features/rules/rules.feature.json:
	mkdir -p $(@D)
	echo "[]" > $@

features/skipped/skipped.feature.json:
	mkdir -p $(@D)
	echo "[]" > $@

features/unknown-parameter-type/unknown-parameter-type.feature.json:
	mkdir -p $(@D)
	echo "[]" > $@

features/%-unprocessed.json: features/% features/%.rb
	-bundle exec cucumber $< --require $(patsubst %-unprocessed.json,%.rb,$@) --tags "not @exclude-json-formatter" --format=json > $@

features/%.rb: $(CCK_PATH)/ruby/features/%.rb
	mkdir -p $(@D)
	cp $(patsubst %,$(CCK_PATH)/ruby/%,$@) $@

features/%.feature: $(CCK_PATH)/javascript/features/%.feature
	mkdir -p $(@D)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

clean:
	rm -f $(FEATURES) $(STEP_DEFINITIONS) $(JSONS_GOLDEN) features/all.json
