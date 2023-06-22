#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import { v as version } from './shared/nitro.4f804c0e.mjs';

const main = defineCommand({
  meta: {
    name: "nitro",
    description: "Nitro CLI",
    version
  },
  subCommands: {
    dev: () => import('./chunks/dev.mjs').then((r) => r.default),
    build: () => import('./chunks/build.mjs').then((r) => r.default),
    prepare: () => import('./chunks/prepare.mjs').then((r) => r.default)
  }
});
runMain(main);
