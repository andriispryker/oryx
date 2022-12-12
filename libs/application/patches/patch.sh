#!/bin/sh
ROOT="${1:-../../../}"
LIB="${2:-node_modules/@spryker-oryx}"

cd $ROOT

if ! patch -R -s -f --dry-run node_modules/@lit-labs/ssr/lib/util/parse5-utils.js < $LIB/application/patches/parse5-utils.patch; then
  patch node_modules/@lit-labs/ssr/lib/util/parse5-utils.js < $LIB/application/patches/parse5-utils.patch
fi

if ! patch -R -s -f --dry-run node_modules/lit-html/development/experimental-hydrate.js < $LIB/application/patches/experimental-hydrate.patch; then
  patch node_modules/lit-html/development/experimental-hydrate.js < $LIB/application/patches/experimental-hydrate.patch
fi


cp $LIB/application/patches/experimental-hydrate.js node_modules/lit-html/experimental-hydrate.js

exit 0
