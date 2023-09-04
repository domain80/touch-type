const Metric = (props) => {
  return (
    <div className="metric">
      <h4 className="metric-value">{props.value}</h4>
      <p className="metric-unit">{props.unit}</p>
    </div>
  );
};

export default Metric;
