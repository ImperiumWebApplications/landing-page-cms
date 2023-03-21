import cx from 'classnames';

type ProgressBarProps = {
  progress?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative mx-auto mt-16 mb-6 hidden h-[10px] w-full max-w-sm rounded-full bg-[black]/10 md:block">
      <div
        style={{ left: `calc(${progress}% - 20px)` }}
        className={cx(
          'absolute -top-7 w-10 rounded-md bg-[black]/10 px-2 text-center text-sm',
          progress === 0 ? 'hidden' : '',
        )}
      >
        {progress}%
      </div>
      <span
        className="block h-full rounded-full bg-primary transition-[1s_ease_100ms]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
