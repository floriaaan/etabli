import classNames from "classnames";

export const Logo = ({
  className = "w-64 h-auto",
}: {
  className?: string;
}) => {
  return <img src="/assets/logo.png" className={classNames(className, "shrink-0 select-none")}></img>;
};
