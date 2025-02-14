// original function definitions with some small changes

export function OldMash() {
  let n = 0xefc8249d;

  const mash = function (data: string) {
    for (let i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = "Mash 0.9";
  return mash;
}

export default function OldAlea() {
  return (function (args) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;

    if (args.length == 0) {
      args = [+new Date()];
    }

    const mash = OldMash();
    s0 = mash(" ");
    s1 = mash(" ");
    s2 = mash(" ");

    for (let i = 0; i < args.length; i++) {
      const arg = args[i].toString();
      s0 -= mash(arg);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(arg);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(arg);
      if (s2 < 0) {
        s2 += 1;
      }
    }

    const random = function () {
      const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function () {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = "Alea 0.9";
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments)));
}
