import { PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { WhirlpoolStrategy } from '../kamino-client/accounts';
import { WHIRLPOOL_PROGRAM_ID } from '../whirpools-client/programId';
import { PROGRAM_ID as RAYDIUM_PROGRAM_ID } from '../raydium_client/programId';
import Decimal from 'decimal.js';
import { RebalanceType, RebalanceTypeKind, StrategyConfigOptionKind } from '../kamino-client/types';
import {
  UpdateStrategyConfigAccounts,
  UpdateStrategyConfigArgs,
  updateStrategyConfig,
} from '../kamino-client/instructions';
import { SqrtPriceMath } from '@raydium-io/raydium-sdk';
import { token } from '@project-serum/anchor/dist/cjs/utils';
import { RebalanceFieldInfo, RebalanceFieldsDict } from './types';
import BN from 'bn.js';

export const DolarBasedMintingMethod = new Decimal(0);
export const ProportionalMintingMethod = new Decimal(1);

export const RebalanceParamOffset = new Decimal(256);

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Dex = ['ORCA', 'RAYDIUM', 'CREMA'] as const;
export type Dex = (typeof Dex)[number];

export function dexToNumber(dex: Dex): number {
  for (let i = 0; i < Dex.length; i++) {
    if (Dex[i] === dex) {
      return i;
    }
  }

  throw new Error(`Unknown DEX ${dex}`);
}

export function numberToDex(num: number): Dex {
  const dex = Dex[num];

  if (!dex) {
    throw new Error(`Unknown DEX ${num}`);
  }
  return dex;
}

export function getDexProgramId(strategyState: WhirlpoolStrategy): PublicKey {
  if (strategyState.strategyDex.toNumber() == dexToNumber('ORCA')) {
    return WHIRLPOOL_PROGRAM_ID;
  } else if (strategyState.strategyDex.toNumber() == dexToNumber('RAYDIUM')) {
    return RAYDIUM_PROGRAM_ID;
  } else {
    throw Error(`Invalid DEX ${strategyState.strategyDex.toString()}`);
  }
}

export function getStrategyConfigValue(value: Decimal): number[] {
  let buffer = Buffer.alloc(128);
  buffer.writeBigUInt64LE(BigInt(value.toString()));
  return [...buffer];
}

export function buildStrategyRebalanceParams(
  params: Array<Decimal>,
  rebalance_type: RebalanceTypeKind,
  tokenADecimals?: number,
  tokenBDecimals?: number
): number[] {
  let buffer = Buffer.alloc(128);
  if (rebalance_type.kind == RebalanceType.Manual.kind) {
    // Manual has no params
  } else if (rebalance_type.kind == RebalanceType.PricePercentage.kind) {
    buffer.writeUint16LE(params[0].toNumber());
    buffer.writeUint16LE(params[1].toNumber(), 2);
  } else if (rebalance_type.kind == RebalanceType.PricePercentageWithReset.kind) {
    buffer.writeUint16LE(params[0].toNumber());
    buffer.writeUint16LE(params[1].toNumber(), 2);
    buffer.writeUint16LE(params[2].toNumber(), 4);
    buffer.writeUint16LE(params[3].toNumber(), 6);
  } else if (rebalance_type.kind == RebalanceType.Drift.kind) {
    buffer.writeInt32LE(params[0].toNumber());
    buffer.writeInt32LE(params[1].toNumber(), 4);
    buffer.writeInt32LE(params[2].toNumber(), 8);
    buffer.writeBigUint64LE(BigInt(params[3].toString()), 12);
    buffer.writeUint8(params[4].toNumber(), 20);
  } else if (rebalance_type.kind == RebalanceType.TakeProfit.kind) {
    const lowerPrice = SqrtPriceMath.priceToSqrtPriceX64(params[0], tokenADecimals!, tokenBDecimals!);
    const upperPrice = SqrtPriceMath.priceToSqrtPriceX64(params[1], tokenADecimals!, tokenBDecimals!);
    writeBigUint128LE(buffer, BigInt(lowerPrice.toString()), 0);
    writeBigUint128LE(buffer, BigInt(upperPrice.toString()), 16);
    buffer.writeUint8(params[2].toNumber(), 32);
  } else if (rebalance_type.kind == RebalanceType.PeriodicRebalance.kind) {
    buffer.writeBigUint64LE(BigInt(params[0].toString()), 0);
    buffer.writeUInt16LE(params[1].toNumber(), 8);
    buffer.writeUInt16LE(params[2].toNumber(), 10);
  } else if (rebalance_type.kind == RebalanceType.Expander.kind) {
    buffer.writeUInt16LE(params[0].toNumber(), 0);
    buffer.writeUInt16LE(params[1].toNumber(), 2);
    buffer.writeUInt16LE(params[2].toNumber(), 4);
    buffer.writeUInt16LE(params[3].toNumber(), 6);
    buffer.writeUInt16LE(params[4].toNumber(), 8);
    buffer.writeUInt16LE(params[5].toNumber(), 10);
    buffer.writeUInt8(params[6].toNumber(), 12);
  } else {
    throw 'Rebalance type not valid ' + rebalance_type;
  }
  return [...buffer];
}

export function numberToRebalanceType(rebalance_type: number): RebalanceTypeKind {
  if (rebalance_type == 0) {
    return new RebalanceType.Manual();
  } else if (rebalance_type == 1) {
    return new RebalanceType.PricePercentage();
  } else if (rebalance_type == 2) {
    return new RebalanceType.PricePercentageWithReset();
  } else if (rebalance_type == 3) {
    return new RebalanceType.Drift();
  } else if (rebalance_type == 4) {
    return new RebalanceType.TakeProfit();
  } else if (rebalance_type == 5) {
    return new RebalanceType.PeriodicRebalance();
  } else if (rebalance_type == 6) {
    return new RebalanceType.Expander();
  } else {
    throw new Error(`Invalid rebalance type ${rebalance_type.toString()}`);
  }
}

export async function getUpdateStrategyConfigIx(
  signer: PublicKey,
  globalConfig: PublicKey,
  strategy: PublicKey,
  mode: StrategyConfigOptionKind,
  amount: Decimal,
  newAccount: PublicKey = PublicKey.default
): Promise<TransactionInstruction> {
  let args: UpdateStrategyConfigArgs = {
    mode: mode.discriminator,
    value: getStrategyConfigValue(amount),
  };

  let accounts: UpdateStrategyConfigAccounts = {
    adminAuthority: signer,
    newAccount,
    globalConfig,
    strategy,
    systemProgram: SystemProgram.programId,
  };

  return updateStrategyConfig(args, accounts);
}

export function collToLamportsDecimal(amount: Decimal, decimals: number): Decimal {
  let factor = new Decimal(10).pow(decimals);
  return amount.mul(factor);
}

export function lamportsToNumberDecimal(amount: Decimal.Value, decimals: number): Decimal {
  const factor = new Decimal(10).pow(decimals);
  return new Decimal(amount).div(factor);
}

export function readBigUint128LE(buffer: Buffer, offset: number): bigint {
  return buffer.readBigUint64LE(offset) + (buffer.readBigUint64LE(offset + 8) << BigInt(64));
}

function writeBigUint128LE(buffer: Buffer, value: bigint, offset: number) {
  const lower_half = value & ((BigInt(1) << BigInt(64)) - BigInt(64));
  const upper_half = value >> BigInt(64);
  buffer.writeBigUint64LE(lower_half, offset);
  buffer.writeBigUint64LE(upper_half, offset + 8);
}

export function rebalanceFieldsDictToInfo(rebalanceFields: RebalanceFieldsDict): RebalanceFieldInfo[] {
  let rebalanceFieldsInfo: RebalanceFieldInfo[] = [];
  for (let key in rebalanceFields) {
    let value = rebalanceFields[key];
    rebalanceFieldsInfo.push({
      label: key,
      type: 'number',
      value: value,
      enabled: false,
    });
  }
  return rebalanceFieldsInfo;
}

export function isVaultInitialized(vault: PublicKey, decimals: BN): boolean {
  return !vault.equals(PublicKey.default) && decimals.toNumber() > 0;
}
