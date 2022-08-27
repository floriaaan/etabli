import { version } from "../../../package.json";

export const VersionDisplayer = () => {
  return (
    <div className="fixed bottom-0 right-0 text-xs items-end p-2 m-1 rounded-md bg-black bg-opacity-25 text-white flex flex-col-reverse">
      <span>
        version: <span className="font-bold">{version}</span>
      </span>
      <span>
        date: <span className="font-bold">{new Date().toISOString()}</span>
      </span>
    </div>
  );
};
