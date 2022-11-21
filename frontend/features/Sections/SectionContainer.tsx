import styled from 'styled-components';

const StyledSection = styled.section<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;

export const SectionContainer: React.FunctionComponent<{
  id: string;
  className?: string;
  bgColor?: string;
  fullWidth?: boolean;
}> = ({ id, className, bgColor, fullWidth, children }) => {
  return (
    <StyledSection id={id} className={className} bgColor={bgColor}>
      {fullWidth ? children : <div className="content-wrapper">{children}</div>}
    </StyledSection>
  );
};
