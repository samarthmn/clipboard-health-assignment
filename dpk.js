const crypto = require("crypto");

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

const MAX_PARTITION_KEY_LENGTH = 256;
// refactored version of deterministicPartitionKey
const refactoredDeterministicPartitionKey = (event) => {
  // If there is no event, return "0"
  if (!event) {
    return "0";
  }
  // Check if partitionKey exists
  if (event.partitionKey) {
    return checkCandidateStringAndMaxPartitionKey(event.partitionKey);
  }
  // else create a hash of the event
  const data = JSON.stringify(event);
  return checkCandidateStringAndMaxPartitionKey(createCryptoHash(data));
};

// Check if the partitionKey is a string and/or if it is longer than MAX_PARTITION_KEY_LENGTH characters then create a hash of it
const checkCandidateStringAndMaxPartitionKey = (candidate) => {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createCryptoHash(candidate);
  }
  return candidate;
};

// Create a hash of the event
const createCryptoHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

module.exports = {
  deterministicPartitionKey,
  refactoredDeterministicPartitionKey,
  checkCandidateStringAndMaxPartitionKey,
  createCryptoHash,
};
