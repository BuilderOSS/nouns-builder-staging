import useSWR from 'swr';
import { useEnsAvatar, useEnsName } from 'wagmi';

import type { AddressType } from 'src/typings';

const fetchNNSName = async (address: `0x${string}` | string): Promise<string | null> => {
  try {
    const res = await fetch(`https://api.nns.xyz/resolve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (!res.ok) {
      console.error('Invalid response from NNS API', res.status, res.statusText);
      return null;
    }

    const body = await res.json();
    return body.name as string | null;
  } catch (error) {
    console.error('Error fetching NNS name:', error);
    return null;
  }
};

const useNnsOrEnsData = (address: AddressType | string) => {
  const validAddress = Boolean(address);

  const { data: ensName } = useEnsName({ address: address as `0x{string}`, enabled: validAddress });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName, enabled: Boolean(ensName) });

  const { data: nnsName, isValidating: isNNSLoading, error: nnsError } = useSWR(
      validAddress ? [address, 'nns-name'] : null, // Use `null` to disable if address is invalid
      () => fetchNNSName(address),
      {
        revalidateOnFocus: false,
        dedupingInterval: 60000, // 1-minute cache
      }
  );

  // NNS takes precedence over ENS
  const selectedName = nnsName ?? ensName;

  const { data: finalAvatar } = useEnsAvatar({
    name: selectedName,
    enabled: Boolean(selectedName),
  });

  return {
    name: selectedName,
    avatar: finalAvatar ?? ensAvatar,
    isLoading: isNNSLoading,
    error: nnsError,
  };
};

export default useNnsOrEnsData;