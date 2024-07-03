export class Mash {
  #n = 0xefc8249d;
  static readonly version = "Mash 0.9" as const;

  /**
   * a hash function that returns a float in the range [0, 1[ based on the input data string.
   *
   * @param {string} data - the string to be hashed
   * @return {number} the hashed result as a float
   * @see {@link https://web.archive.org/web/20120124013936/http://baagoe.org/en/wiki/Better_random_numbers_for_javascript#Mash}
   */
  mash(data: string): number {
    for (let i = 0; i < data.length; i++) {
      this.#n += data.charCodeAt(i);
      let h = 0.02519603282416938 * this.#n;
      this.#n = h >>> 0;
      h -= this.#n;
      h *= this.#n;
      this.#n = h >>> 0;
      h -= this.#n;
      this.#n += h * 0x100000000;
    }
    return (this.#n >>> 0) * 2.3283064365386963e-10;
  }
}

export type AleaOptions = Partial<{ seed: string | number }>;

export default class Alea {
  static readonly version = "Alea 0.9" as const;
  #seed: string;
  #s0: number = 0;
  #s1: number = 0;
  #s2: number = 0;
  #c: number = 1;
  #mash: Mash;

  /**
   * creates a random float.
   *
   * @returns a random float from [0, 1[
   */
  random = (): number => {
    const t = 2091639 * this.#s0 + this.#c * 2.3283064365386963e-10;
    this.#s0 = this.#s1;
    this.#s1 = this.#s2;
    return this.#s2 = t - (this.#c = t | 0);
  };

  /**
   * creates a random unsigned 32-bit integer.
   *
   * @returns an unsigned random integer in the range [0, 2^32[
   */
  uint32 = (): number => this.random() * 0x100000000;

  /**
   * creates a random 53-bit fraction.
   *
   * @returns a 53-bit fraction in [0, 1[
   */
  fract53 = (): number =>
    this.random() + (this.random() * 0x200000 | 0) * 1.1102230246251565e-16;

  get seed(): string {
    return this.#seed;
  }

  /**
   * creates a new Alea instance with the given options.
   *
   * @param opts.seed - seed to use for the Alea instance. if not provided, `+new Date` will be used.
   */
  constructor(opts?: AleaOptions) {
    this.#mash = new Mash();
    this.#s0 = this.#mash.mash(" ");
    this.#s1 = this.#mash.mash(" ");
    this.#s2 = this.#mash.mash(" ");

    this.#seed = opts?.seed !== undefined
      ? (typeof opts.seed === "number" ? opts.seed.toString() : opts.seed)
      : (+new Date()).toString();
    this.#s0 -= this.#mash.mash(this.#seed);
    if (this.#s0 < 0) this.#s0 += 1;
    this.#s1 -= this.#mash.mash(this.#seed);
    if (this.#s1 < 0) this.#s1 += 1;
    this.#s2 -= this.#mash.mash(this.#seed);
    if (this.#s2 < 0) this.#s2 += 1;
  }
}
