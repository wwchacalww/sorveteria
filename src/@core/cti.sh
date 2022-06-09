#!/bin/sh

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -b 

npm run cti create './src/product/application' -- -i '*spec.ts' -b &&
npm run cti create './src/product/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/product/infra' -- -i '*spec.ts' -b 