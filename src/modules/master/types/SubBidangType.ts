import type { BidangInterface } from "./BidangType";

export interface SubBidangInterface {
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  bidang_uuid: string;
  bidang: BidangInterface;
}

export interface SubBidangCreateInterface {
  name: string;
  bidang_uuid: string;
}
