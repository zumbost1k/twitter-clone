const Tick = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title />

      <g id='Complete'>
        <g id='tick'>
          <polyline
            fill='none'
            points='3.7 14.3 9.6 19 20.3 5'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </g>
      </g>
    </svg>
  );
};

export default Tick;
