import { expect } from 'chai';
import { TimeTravelKVStore } from "../src/lib";

function getSimpleClock() {
    let time = 0;
    return function () {
        return time++;
    }
}

describe("The Time Travel KV Store", () => {
    it("should return null on get on an empty kv store", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        expect(kvs.get("hello stripe")).to.be.null;
    });

    it("should return null on get with optional timestamp on an empty kv store", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        expect(kvs.get("hello stripe", 0)).to.be.null;
        expect(kvs.get("hello stripe", 1)).to.be.null;
    });

    it("should return the correct value on a single entry store", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        expect(kvs.get("hello")).to.be.equal("stripe");
    });

    it("should return the most recent entry on a store with multiple values for the same entry", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("hello", "Tom");
        expect(kvs.get("hello")).to.be.equal("Tom");
    });

    it("should return the entry with the more accurate timestamp on a store with multiple values for the same entry", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("hello", "Tom");
        expect(kvs.get("hello", 0)).to.be.equal("stripe");
        expect(kvs.get("hello", 1)).to.be.equal("Tom");
    });

    it("should return the correct value on a multi entry store where there are different", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("goodbye", "Microsoft");
        expect(kvs.get("hello")).to.be.equal("stripe");
        expect(kvs.get("goodbye")).to.be.equal("Microsoft");
    });

    it("should return the most recent entry on a store with multiple values for the same entry", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("hello", "Tom");
        kvs.put("goodbye", "Microsoft");
        kvs.put("goodbye", "Google");

        expect(kvs.get("hello")).to.be.equal("Tom");
        expect(kvs.get("goodbye")).to.be.equal("Google");
    });

    it("should return the entry with the more accurate timestamp on a store with multiple values for the same entry", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("hello", "Tom");
        kvs.put("goodbye", "Microsoft");
        kvs.put("goodbye", "Google");

        expect(kvs.get("hello", 0)).to.be.equal("stripe");
        expect(kvs.get("hello", 1)).to.be.equal("Tom");
        expect(kvs.get("goodbye", 2)).to.be.equal("Microsoft");
        expect(kvs.get("goodbye", 3)).to.be.equal("Google");
    });

    it("should return the entry with the more accurate timestamp on a store with multiple values for the same entry", () => {
        const kvs = new TimeTravelKVStore<string, string>(getSimpleClock());
        kvs.put("hello", "stripe");
        kvs.put("hello", "Tom");
        kvs.put("goodbye", "Microsoft");
        kvs.put("goodbye", "Google");

        expect(kvs.get("goodbye", 0)).to.be.equal(null);
        expect(kvs.get("goodbye", 1)).to.be.equal(null);
    });

    it("should work with skipped times", () => {
        const clock = getSimpleClock();
        const kvs = new TimeTravelKVStore<string, string>(clock);
        kvs.put("hello", "stripe");
        const after_first_hello = clock();
        clock();
        kvs.put("hello", "Tom");
        const after_second_hello = clock();
        clock();
        kvs.put("goodbye", "Microsoft");
        clock();
        clock();
        kvs.put("goodbye", "Google");

        expect(kvs.get("hello", after_first_hello - 1)).to.be.equal("stripe");
    });
});
