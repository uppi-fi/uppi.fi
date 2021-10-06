export type TextProps = Pick<
  React.CSSProperties,
  'textAlign' | 'fontSize' | 'fontFamily' | 'color' | 'textDecoration'
> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>;

const Text: React.FC<TextProps> = ({ children, className, ...css }) => {
  return (
    <div className={className} style={css}>
      {children}
    </div>
  );
};

export default Text;
