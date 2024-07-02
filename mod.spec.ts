import { assertEquals } from "jsr:@std/assert@^0.226.0";
import Alea, { Mash } from "./mod.ts";
import OldAlea, { OldMash } from "./mod.old.ts";

const newMash = new Mash();
const oldMash = OldMash();

const newAlea = new Alea({ seed: "meow" });
//@ts-ignore: typescript is being silly
const oldAlea = new OldAlea("meow");

Deno.test("mash", () => {
  let ok = 0;
  for (let i = 0; i < 1000; i++) {
    if (newMash.mash(" ") === oldMash(" ")) ok += 1;
  }
  assertEquals(ok, 1000);
});

Deno.test("alea", async (t) => {
  await t.step("seed", () => {
    assertEquals(newAlea.seed, "meow");
  });

  let ok = 0;
  await t.step("random", () => {
    for (let i = 0; i < 1000; i++) {
      if (newAlea.random() === oldAlea()) ok += 1;
    }
    assertEquals(ok, 1000);
  });

  ok = 0;
  await t.step("fract53", () => {
    for (let i = 0; i < 1000; i++) {
      if (newAlea.fract53() === oldAlea.fract53()) ok += 1;
    }
    assertEquals(ok, 1000);
  });

  ok = 0;
  await t.step("uint32", () => {
    for (let i = 0; i < 1000; i++) {
      if (newAlea.uint32() === oldAlea.uint32()) ok += 1;
    }
    assertEquals(ok, 1000);
  });
});
