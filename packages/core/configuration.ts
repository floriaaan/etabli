import Datastore from "nedb-promises";
const datastore = Datastore.create("/tmp/configuration.db");

export type KeyValue = {
  key: string;
  value: any;
};

export type Configuration = {
  get: (key: string, defaultValue?: any) => Promise<any>;
  set: (key: string, value: any) => Promise<void>;

  datastore: Datastore<{ _id: string }>;
};

const get = async (key: string, defaultValue: any = null) => {
  const doc: KeyValue = await datastore.findOne({ key });

  if (doc) return doc?.value;
  else return defaultValue;
};

const set = async (key: string, value: any) => {
  await datastore.update({ key }, { key, value }, { upsert: true });
};

export default async function (): Promise<Configuration> {
  return Promise.resolve({
    datastore,
    get,
    set,
  });
}
