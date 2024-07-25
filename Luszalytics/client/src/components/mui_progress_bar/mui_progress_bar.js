import * as React from "react";
import clsx from "clsx";
import './bar.css'

const ProgressBar = React.memo(function ProgressBar(props) {
  const { value } = props;
  const valueInPercent = value;
  return (
    <div style={{
      border: "1px solid black",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: 26,
      borderRadius: 2
    }}>
      <div
        style={{
          position: "absolute",
          lineHeight: "24px",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx('bar', {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
});
export function renderProgress(params) {
  return <ProgressBar value={Number(params.value)} />;
}