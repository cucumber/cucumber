include default.mk

CCK_PATH = ../../compatibility-kit
CCK_FEATURES=$(call rwildcard,$(CCK_PATH)/javascript/features,*.feature)
FEATURES=$(patsubst $(CCK_PATH)/javascript/%,%,$(CCK_FEATURES))
STEP_DEFINITIONS=$(patsubst %,%.ts,$(FEATURES))
NDJSONS_GOLDEN  = $(patsubst features/%,features/%.ndjson,$(FEATURES))

.tested: $(NDJSONS_GOLDEN)

# Dirty hack: the Ruby version we use do not support some features.
features/pending/pending.feature.ndjson:
	mkdir -p $(@D)
	echo "" > $@

features/rules/rules.feature.ndjson:
	mkdir -p $(@D)
	echo "" > $@

features/skipped/skipped.feature.ndjson:
	mkdir -p $(@D)
	echo "" > $@

features/unknown-parameter-type/unknown-parameter-type.feature.ndjson:
	mkdir -p $(@D)
	echo "" > $@

features/%.ndjson: features/% features/%.ts
	../../fake-cucumber/javascript/scripts/fake-cucumber.sh \
		--predictable-ids \
		$< > $@

features/%.ts: $(CCK_PATH)/javascript/features/%.ts
	mkdir -p $(@D)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

features/%.feature: $(CCK_PATH)/javascript/features/%.feature
	mkdir -p $(@D)
	cp $(patsubst %,$(CCK_PATH)/javascript/%,$@) $@

clean:
	rm -f $(FEATURES) $(STEP_DEFINITIONS) $(NDJSONS_GOLDEN)
