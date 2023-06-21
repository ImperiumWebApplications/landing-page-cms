export type ArticleProps = {
  children: React.ReactNode;
};

export const Article: React.FC<ArticleProps> = ({ children }) => {
  console.log('Test log on the asds');
  return (
    <div className="wrap-words whitespace-pre-wrap pt-12 pb-20">{children}</div>
  );
};
