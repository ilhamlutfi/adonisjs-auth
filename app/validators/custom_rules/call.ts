import { VineString } from '@vinejs/vine';
import { uniqueRule, Options } from './unique.js';

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this;
  }
}

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options));
});
