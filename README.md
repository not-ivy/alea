# alea

[![builds.sr.ht status](https://builds.sr.ht/~furry/alea/commits/mistress/.build.yml.svg)](https://builds.sr.ht/~furry/alea/commits/mistress/.build.yml)
[![jsr version](https://jsr.io/badges/@iv/alea)](https://jsr.io/@iv/alea)

a seedable pseudo random number generator; more information can be found
[here](https://web.archive.org/web/20120124013936/http://baagoe.org/en/wiki/Better_random_numbers_for_javascript#Alea).

the code is rewritten from
[here](https://web.archive.org/web/20120303015325/http://baagoe.org/en/wiki/Alea)(alea)
and
[here](https://web.archive.org/web/20120303015224/http://baagoe.org/en/wiki/Mash)(mash)
to use modern javascript features, and in typescript to provide better typing.

## use

this package provides 2 exports, one is alea(the prng), and mash(for hashing).

**note:** the hash function preserves its internal state on each run, so unless
you create a new `Mash` class on each run, you are likely to get different
results with the same input.

```ts
import { default as Alea, Mash } from "jsr:@iv/alea";

const mash = new Mash();
const alea = new Alea({
  seed: "demo", // you can provide a seed here, if not provided, +new Date will be used as the seed.
});

alea.random(); // returns a random float from [0, 1[.
alea.uint32(); // returns an unsigned random integer in the range [0, 2^32[
alea.fract53(); // returns a 53-bit fraction in [0, 1[

mash.mash("demo") // returns a float from [0 to 1[.
(mash.mash("demo") * 0x100000000).toString(16); // a hex string representing the hash
```

## benchmark

it's pretty fast.

```
cpu: 12th Gen Intel(R) Core(TM) i7-1260P
runtime: deno 1.44.1 (x86_64-unknown-linux-gnu)

benchmark        time (avg)        iter/s             (min … max)       p75       p99      p995
----------------------------------------------------------------- -----------------------------
Math.random       7.08 ns/iter 141,176,362.4   (6.27 ns … 293.57 ns) 6.98 ns 11.27 ns 12.42 ns
random           51.93 ns/iter  19,256,531.0  (37.82 ns … 117.64 ns) 52.54 ns 106.51 ns 110.81 ns
xorshift          6.96 ns/iter 143,679,627.6    (6.43 ns … 20.85 ns) 6.94 ns 7.8 ns 8.36 ns
alea-old          15.4 ns/iter  64,926,454.6   (13.66 ns … 39.28 ns) 15.29 ns 21.71 ns 23.87 ns
alea-new          5.78 ns/iter 172,958,741.8     (5.4 ns … 12.65 ns) 5.82 ns 6.92 ns 7.09 ns

summary
  alea-new
   1.2x faster than xorshift
   1.23x faster than Math.random
   2.66x faster than alea-old
   8.98x faster than random
```

## license

the original code(in mod.old.ts) is licensed under
MIT[(source)](https://web.archive.org/web/20120124013936/http://baagoe.org/en/wiki/Better_random_numbers_for_javascript#License).
the derivative work(in mod.ts) is licensed under ISC, which is compatible with
MIT.
