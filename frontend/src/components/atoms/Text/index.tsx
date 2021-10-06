import { Margins } from '../common';

export type TextProps = Margins &
  Pick<
    React.CSSProperties,
    | 'textAlign'
    | 'fontWeight'
    | 'fontSize'
    | 'fontWeight'
    | 'fontFamily'
    | 'color'
    | 'textDecoration'
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
