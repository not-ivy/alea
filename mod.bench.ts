import OldAlea from "./mod.old.ts";
import Alea from "./mod.ts";
import xorshift from "https://esm.sh/xorshift@1.2.0";
import random from "https://esm.sh/random@4.1.0";

const newAlea = new Alea();
const oldAlea = OldAlea();

Deno.bench("Math.random", () => {
  Math.random();
});

Deno.bench("random", () => {
  random.float();
});

Deno.bench("xorshift", () => {
  xorshift.random();
});

Deno.bench("alea-old", () => {
  oldAlea();
});

Deno.bench("alea-new", { baseline: true }, () => {
  newAlea.random();
});
