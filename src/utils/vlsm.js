const ipToInt = (ip) => {
  return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
};

const intToIp = (int) => {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
};

export const calculateVLSM = (baseIp, subnets) => {
  const sortedSubnets = [...subnets].sort((a, b) => b.hosts - a.hosts);
  let currentIpInt = ipToInt(baseIp);
  const results = [];

  for (const subnet of sortedSubnets) {
    const requiredIps = subnet.hosts + 2;
    const blockSize = Math.pow(2, Math.ceil(Math.log2(requiredIps)));
    const newCidr = 32 - Math.log2(blockSize);
    
    const networkId = currentIpInt;
    const firstIp = networkId + 1;
    const broadcastId = networkId + blockSize - 1;
    const lastIp = broadcastId - 1;
    
    results.push({
      id: subnet.id,
      name: subnet.name,
      neededSize: subnet.hosts,
      allocatedSize: blockSize,
      cidr: newCidr,
      networkId: intToIp(networkId),
      firstIp: intToIp(firstIp),
      lastIp: intToIp(lastIp),
      broadcastId: intToIp(broadcastId),
    });

    currentIpInt += blockSize;
  }
  return results;
};