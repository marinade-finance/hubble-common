/**
 * @deprecated Deprecated since version 2.2.47 - please use {@link getOraclePrices} or the respective SDK client instead.
 * @see [hubble-sdk]{@link https://github.com/hubbleprotocol/hubble-common/blob/0512e85c5a816a557fe7feaf55981cabcd992476/packages/hubble-sdk/src/Hubble.ts#L722} getAllPrices method
 * @see [kamino-sdk]{@link https://github.com/hubbleprotocol/hubble-common/blob/0be269d4fdb3dbadbbd8c7fcca68c6b1928d445a/packages/kamino-sdk/src/Kamino.ts#L1717} getAllPrices method
 * @see [kamino-lending-sdk]{@link https://github.com/hubbleprotocol/kamino-lending-sdk/blob/17a48b6bb21945d2d799d31d6f0b20104e8c83ac/src/classes/market.ts#L759} getAllScopePrices method
 * @description Scope pair config
 */
export const ScopePairs = [
  'SOL/USD',
  'ETH/USD',
  'BTC/USD',
  'wBTC/USD',
  'SRM/USD',
  'RAY/USD',
  'FTT/USD',
  'MSOL/USD',
  'scnSOL/SOL',
  'BNB/USD',
  'AVAX/USD',
  'daoSOL/SOL',
  'USDH/USD',
  'STSOL/USD',
  'cSOL/SOL',
  'cETH/ETH',
  'cBTC/BTC',
  'cMSOL/MSOL',
  'wstETH/USD',
  'LDO/USD',
  'USDC/USD',
  'cUSDC/USDC',
  'USDT/USD',
  'ORCA/USD',
  'MNDE/USD',
  'HBB/USD',
  'cORCA/ORCA',
  'cSLND/SLND',
  'cSRM/SRM',
  'cRAY/RAY',
  'cFTT/FTT',
  'cSTSOL/STSOL',
  'SLND/USD',
  'DAI/USD',
  'JSOL/SOL',
  'USH/USD',
  'UXD/USD',
  'USDHTwap/USD',
  'USHTwap/USD',
  'UXDTwap/USD',
  'HDG/USD',
  'DUST/USD',
  'kUSDHUSDCOrca/USD',
  'kSOLSTSOLOrca/USD',
  'kUSDCUSDTOrca/USD',
  'kUSHUSDCOrca/USD',
  'USDR/USD',
  'USDRTwap/USD',
  'RATIO/USD',
  'UXP/USD',
  'kUXDUSDCOrca/USD',
  'JITOSOL/SOL',
  'SOLEma/USD',
  'ETHEma/USD',
  'BTCEma/USD',
  'SRMEma/USD',
  'RAYEma/USD',
  'FTTEma/USD',
  'MSOLTwap/USD',
  'BNBEma/USD',
  'AVAXEma/USD',
  'USDCEma/USD',
  'USDTEma/USD',
  'DAIEma/USD',
  'wstETHEma/USD',
  'DUSTTwap/USD',
  'BONK/USD',
  'BONKTwap/USD',
  'SAMO/USD',
  'SAMOTwap/USD',
  'bSOL/SOL',
  'LaineSOL/SOL',
  'HADES/USD',
  'HADESTwap/USD',
  'STSOL/SOL',
  'STSOLTwap/USD',
  'RLB/USD',
  'RLBTwap/USD',
  'CGNTSOL/SOL',
  'HXRO/USD',
  'HXROTwap/USD',
  'MNDETwap/USD',
  'USDCet/USD',
  'HNT/USD',
  'HNTEma/USD',
  'MOBILE/HNT',
  'MOBILETwap/HNT',
  'IOT/HNT',
  'IOTTwap/HNT',
  'NANA/USD',
  'NANATwap/USD',
  'STEP/USD',
  'STEPTwap/USD',
  'FORGE/USD',
  'FORGETwap/USD',
  'TBTC/USD',
  'COCO/USD',
  'COCOTwap/USD',
  'STYLE/USD',
  'STYLETwap/USD',
  'CHAI/USD',
  'CHAITwap/USD',
  'T/USD',
  'TTwap/USD',
  'BLZE/USD',
  'BLZETwap/USD',
  'EUROE/USD',
  'EUROETwap/USD',
  'kSOLBSOLOrca/USD',
  'kMNDEMSOLOrca/USD',
  'kSTSOLUSDCOrca/USD',
  'kUSDHUSDTOrca/USD',
  'kSOLJITOSOLOrca/USD',
  'kbSOLMSOLOrca/USD',
  'kMSOLJITOSOLOrca/USD',
  'kSOLUSDCOrca/USD',
  'kJITOSOLUSDCOrca/USD',
  'LST/SOL',
  'kSOLJITOSOLRaydium/USD',
  'kSOLMSOLRaydium/USD',
  'RNDR/USD',
  'RNDREma/USD',
] as const;
/**
 * @deprecated Deprecated since version 2.2.47 - please use {@link getOraclePrices} or the respective SDK client instead.
 * @see [hubble-sdk]{@link https://github.com/hubbleprotocol/hubble-common/blob/0512e85c5a816a557fe7feaf55981cabcd992476/packages/hubble-sdk/src/Hubble.ts#L722} getAllPrices method
 * @see [kamino-sdk]{@link https://github.com/hubbleprotocol/hubble-common/blob/0be269d4fdb3dbadbbd8c7fcca68c6b1928d445a/packages/kamino-sdk/src/Kamino.ts#L1717} getAllPrices method
 * @see [kamino-lending-sdk]{@link https://github.com/hubbleprotocol/kamino-lending-sdk/blob/17a48b6bb21945d2d799d31d6f0b20104e8c83ac/src/classes/market.ts#L759} getAllScopePrices method
 * @description
 */
export type ScopePair = (typeof ScopePairs)[number];
