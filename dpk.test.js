const {
  deterministicPartitionKey,
  refactoredDeterministicPartitionKey,
  checkCandidateStringAndMaxPartitionKey,
  createCryptoHash,
} = require("./dpk");
const {
  longEventObject,
  hashOfPartitionKeyLongEventObject,
} = require("./testUtils");

// write common tests here for both deterministicPartitionKey and refactoredDeterministicPartitionKey

const commonTests = (fun) => {
  it("Returns the literal '0' when given no input", () => {
    const trivialPartitionKey = fun();
    expect(trivialPartitionKey).toBe("0");
  });
  it("Return the partitionKey when given an event with a partitionKey", () => {
    const event = { partitionKey: "123" };
    const result = fun(event);
    expect(result).toBe("123");
  });
  it("Returns a hash of the event when given an event without a partitionKey", () => {
    const event = { foo: "bar" };
    const result = fun(event);
    expect(result).toBe(
      "a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8"
    );
  });
  it("Returns a hash of the event when given an event with a partitionKey that is too long", () => {
    const event = longEventObject;
    const result = fun(event);
    expect(result).toBe(hashOfPartitionKeyLongEventObject);
  });
  it("Returns a stringified event.partitionKey object when partitionKey is given", () => {
    const event = { partitionKey: { foo: "bar" } };
    const result = fun(event);
    expect(result).toBe(JSON.stringify(event.partitionKey));
  });
};

describe("deterministicPartitionKey", () => {
  commonTests(deterministicPartitionKey);
});

describe("refactoredDeterministicPartitionKey", () => {
  commonTests(refactoredDeterministicPartitionKey);
  // Extra tests for refactoredDeterministicPartitionKey
  describe("checkCandidateStringAndMaxPartitionKey", () => {
    it("Returns a stringified event.partitionKey object when partitionKey is given", () => {
      const event = { partitionKey: { foo: "bar" } };
      const result = checkCandidateStringAndMaxPartitionKey(event.partitionKey);
      expect(result).toBe(JSON.stringify(event.partitionKey));
    });
    it("Returns a hash if MAX_PARTITION_KEY_LENGTH is exceeded", () => {
      const event = longEventObject;
      const result = checkCandidateStringAndMaxPartitionKey(event.partitionKey);
      expect(result).toBe(hashOfPartitionKeyLongEventObject);
    });
  });

  describe("createCryptoHash", () => {
    it("Returns a hash of the event", () => {
      const event = { foo: "bar" };
      const result = createCryptoHash(JSON.stringify(event));
      expect(result).toBe(
        "a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8"
      );
    });
  });
});
