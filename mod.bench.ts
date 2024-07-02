import OldAlea, { OldMash } from "./mod.old.ts";
import Alea, { Mash } from "./mod.ts";

const newMash = new Mash();
const oldMash = OldMash();

const newAlea = new Alea();
const oldAlea = OldAlea();

Deno.bench("mash-old", () => {
  oldMash(" ");
});

Deno.bench("mash-new", () => {
  newMash.mash(" ");
});

Deno.bench("alea-old", () => {
  oldAlea();
});

Deno.bench("alea-new", () => {
  newAlea.random();
});
