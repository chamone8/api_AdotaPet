const NodeCache = require("node-cache");

class Cache {
    constructor(ttlSeconds = 120) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        return this.cache.set(key, value);
    }

    delete(key) {
        return this.cache.del(key);
    }

}
module.exports = new Cache();