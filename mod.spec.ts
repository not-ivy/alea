import { assert, assertEquals } from "jsr:@std/assert@^0.226.0";
import Alea, { Mash } from "./mod.ts";
import OldAlea, { OldMash } from "./mod.old.ts";

const newMash = new Mash();
const oldMash = OldMash();

//@ts-ignore: typescript is being silly
const aleaFactory = () => [new Alea({ seed: "meow" }), new OldAlea("meow")];
// deno-lint-ignore no-explicit-any
let [newAlea, oldAlea] = aleaFactory() as [Alea, any];

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

  await t.step("normal", () => {
    const normal = [] as number[];
    for (let i = 0; i < 1e3; i++) {
      normal.push(newAlea.normal());
    }

    // just test that it works right now :p
  });

  await t.step("triangular", () => {
    const triangular = [] as number[];
    for (let i = 0; i < 1e3; i++) {
      triangular.push(newAlea.triangular(0, 3, 0));
    }

    assert(triangular.every((n) => n >= 0 && n <= 3));
  });

  let ok = 0;
  [newAlea, oldAlea] = aleaFactory();
  await t.step("random", () => {
    for (let i = 0; i < 1e3; i++) {
      if (newAlea.random() === oldAlea()) ok += 1;
    }
    assertEquals(ok, 1000);
  });

  ok = 0;
  await t.step("fract53", () => {
    for (let i = 0; i < 1e3; i++) {
      if (newAlea.fract53() === oldAlea.fract53()) ok += 1;
    }
    assertEquals(ok, 1000);
  });

  ok = 0;
  await t.step("uint32", () => {
    for (let i = 0; i < 1e3; i++) {
      if (newAlea.uint32() === oldAlea.uint32()) ok += 1;
    }
    assertEquals(ok, 1000);
  });
});
