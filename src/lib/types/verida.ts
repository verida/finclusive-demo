export type UserProfile = {
  id: string;
  name?: string;
  avatar?: string;
};

export interface RecordMeta {
  _id: string;
  _rev: string;
}

export type VeridaDatastoreListener = {
  cancel: () => void;
};
